#!/usr/bin/env bash
set -Eeuo pipefail

# usage: file_env VAR [DEFAULT]
file_env() {
    local var="$1"
    local fileVar="${var}_FILE"
    local def="${2:-}"
    if [ "${!var:-}" ] && [ "${!fileVar:-}" ]; then
        echo >&2 "error: both $var and $fileVar are set (but are exclusive)"
        exit 1
    fi
    local val="$def"
    if [ "${!var:-}" ]; then
        val="${!var}"
    elif [ "${!fileVar:-}" ]; then
        val="$(< "${!fileVar}")"
    fi
    export "$var"="$val"
    unset "$fileVar"
}

# Create necessary directories for PostgreSQL
docker_create_db_directories() {
    local user; user="$(id -u)"

    mkdir -p "$PGDATA"
    chmod 700 "$PGDATA" || :

    mkdir -p /var/run/postgresql || :
    chmod 3775 /var/run/postgresql || :

    if [ -n "${POSTGRES_INITDB_WALDIR:-}" ]; then
        mkdir -p "$POSTGRES_INITDB_WALDIR"
        if [ "$user" = '0' ]; then
            find "$POSTGRES_INITDB_WALDIR" \! -user postgres -exec chown postgres '{}' +
        fi
        chmod 700 "$POSTGRES_INITDB_WALDIR"
    fi

    if [ "$user" = '0' ]; then
        find "$PGDATA" \! -user postgres -exec chown postgres '{}' +
        find /var/run/postgresql \! -user postgres -exec chown postgres '{}' +
    fi
}

# Initialize the PostgreSQL database directory
docker_init_database_dir() {
    local uid; uid="$(id -u)"
    if ! getent passwd "$uid" &> /dev/null; then
        local wrapper
        for wrapper in {/usr,}/lib{/*,}/libnss_wrapper.so; do
            if [ -s "$wrapper" ]; then
                NSS_WRAPPER_PASSWD="$(mktemp)"
                NSS_WRAPPER_GROUP="$(mktemp)"
                export LD_PRELOAD="$wrapper" NSS_WRAPPER_PASSWD NSS_WRAPPER_GROUP
                local gid; gid="$(id -g)"
                printf 'postgres:x:%s:%s:PostgreSQL:%s:/bin/false\n' "$uid" "$gid" "$PGDATA" > "$NSS_WRAPPER_PASSWD"
                printf 'postgres:x:%s:\n' "$gid" > "$NSS_WRAPPER_GROUP"
                break
            fi
        done
    fi

    if [ -n "${POSTGRES_INITDB_WALDIR:-}" ]; then
        set -- --waldir "$POSTGRES_INITDB_WALDIR" "$@"
    fi

    eval "initdb --username='$POSTGRES_USER' --pwfile=<(echo '$POSTGRES_PASSWORD') $POSTGRES_INITDB_ARGS"

    if [[ "${LD_PRELOAD:-}" == */libnss_wrapper.so ]]; then
        rm -f "$NSS_WRAPPER_PASSWD" "$NSS_WRAPPER_GROUP"
        unset LD_PRELOAD NSS_WRAPPER_PASSWD NSS_WRAPPER_GROUP
    fi
}

# Verify necessary environment variables are set
docker_verify_minimum_env() {
    if [ -z "$POSTGRES_PASSWORD" ] && [ "$POSTGRES_HOST_AUTH_METHOD" != 'trust' ]; then
        echo >&2 "Error: Database is uninitialized and superuser password is not specified."
        echo >&2 "You must specify POSTGRES_PASSWORD to a non-empty value for the superuser."
        exit 1
    fi
}

# Process initialization files
docker_process_init_files() {
    psql=( docker_process_sql )

    echo
    local f
    for f; do
        case "$f" in
            *.sh)
                if [ -x "$f" ]; then
                    echo "$0: running $f"
                    "$f"
                else
                    echo "$0: sourcing $f"
                    . "$f"
                fi
                ;;
            *.sql)    echo "$0: running $f"; docker_process_sql -f "$f"; echo ;;
            *.sql.gz) echo "$0: running $f"; gunzip -c "$f" | docker_process_sql; echo ;;
            *.sql.xz) echo "$0: running $f"; xzcat "$f" | docker_process_sql; echo ;;
            *)        echo "$0: ignoring $f" ;;
        esac
        echo
    done
}

docker_process_sql() {
    local query_runner=( psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --no-password --no-psqlrc )
    if [ -n "$POSTGRES_DB" ]; then
        query_runner+=( --dbname "$POSTGRES_DB" )
    fi

    PGHOST= PGHOSTADDR= "${query_runner[@]}" "$@"
}

docker_setup_db() {
    local dbAlreadyExists
    dbAlreadyExists="$(POSTGRES_DB= docker_process_sql --dbname postgres --set db="$POSTGRES_DB" --tuples-only <<EOSQL
        SELECT 1 FROM pg_database WHERE datname = :'db';
EOSQL
    )"
    if [ -z "$dbAlreadyExists" ]; then
        POSTGRES_DB= docker_process_sql --dbname postgres --set db="$POSTGRES_DB" <<EOSQL
            CREATE DATABASE :"db";
EOSQL
        echo
    fi
}

docker_setup_env() {
    file_env 'POSTGRES_PASSWORD'
    file_env 'POSTGRES_USER' 'postgres'
    file_env 'POSTGRES_DB' "$POSTGRES_USER"
    file_env 'POSTGRES_INITDB_ARGS'
    : "${POSTGRES_HOST_AUTH_METHOD:=}"

    declare -g DATABASE_ALREADY_EXISTS
    : "${DATABASE_ALREADY_EXISTS:=}"
    if [ -s "$PGDATA/PG_VERSION" ]; then
        DATABASE_ALREADY_EXISTS='true'
    fi
}

pg_setup_hba_conf() {
    if [ "$1" = 'postgres' ]; then
        shift
    fi
    local auth
    auth="$(postgres -C password_encryption "$@")"
    : "${POSTGRES_HOST_AUTH_METHOD:=$auth}"
    {
        echo
        if [ "$POSTGRES_HOST_AUTH_METHOD" = 'trust' ]; then
            echo "# warning trust is enabled for all connections"
            echo "# see https://www.postgresql.org/docs/12/auth-trust.html"
        fi
        echo "host all all all $POSTGRES_HOST_AUTH_METHOD"
    } >> "$PGDATA/pg_hba.conf"
}

# Include SSL configuration if needed
docker_configure_ssl() {
    if [ -n "${SSL_KEY_PATH:-}" ] && [ -n "${SSL_CERT_PATH:-}" ]; then
        echo "Configuring PostgreSQL to use SSL..."
        {
            echo "ssl = on"
            echo "ssl_cert_file = '${SSL_CERT_PATH}'"
            echo "ssl_key_file = '${SSL_KEY_PATH}'"
            [ -n "${DATABASE_SSL_CA:-}" ] && echo "ssl_ca_file = '${DATABASE_SSL_CA}'"
        } >> "$PGDATA/postgresql.conf"
    fi
}

docker_temp_server_start() {
    if [ "$1" = 'postgres' ]; then
        shift
    fi

    set -- "$@" -c listen_addresses='' -p "${PGPORT:-5433}"

    PGUSER="${PGUSER:-$POSTGRES_USER}" \
    pg_ctl -D "$PGDATA" \
        -o "$(printf '%q ' "$@")" \
        -w start
}

docker_temp_server_stop() {
    PGUSER="${PGUSER:-postgres}" \
    pg_ctl -D "$PGDATA" -m fast -w stop
}

_pg_want_help() {
    local arg
    for arg; do
        case "$arg" in
            -'?'|--help|--describe-config|-V|--version)
                return 0
                ;;
        esac
    done
    return 1
}

_is_sourced() {
    [ "${#FUNCNAME[@]}" -ge 2 ] && [ "${FUNCNAME[0]}" = '_is_sourced' ] && [ "${FUNCNAME[1]}" = 'source' ]
}

_main() {
    if [ "${1:0:1}" = '-' ]; then
        set -- postgres "$@"
    fi

    if [ "$1" = 'postgres' ] && ! _pg_want_help "$@"; then
        docker_setup_env
        docker_create_db_directories
        if [ "$(id -u)" = '0' ]; then
            exec gosu postgres "$BASH_SOURCE" "$@"
        fi

        if [ -z "$DATABASE_ALREADY_EXISTS" ]; then
            docker_verify_minimum_env

            ls /docker-entrypoint-initdb.d/ > /dev/null

            docker_init_database_dir
            pg_setup_hba_conf "$@"
            docker_configure_ssl

            export PGPASSWORD="${PGPASSWORD:-$POSTGRES_PASSWORD}"
            docker_temp_server_start "$@"

            docker_setup_db
            docker_process_init_files /docker-entrypoint-initdb.d/*

            docker_temp_server_stop
            unset PGPASSWORD

            echo
            echo "PostgreSQL init process complete; ready for start up."
            echo
        else
            echo
            echo "PostgreSQL Database directory appears to contain a database; Skipping initialization"
            echo
        fi
    fi

    exec "$@"
}

if ! _is_sourced; then
    _main "$@"
fi