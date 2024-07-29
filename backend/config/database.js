module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'db'),
      port: env.int('DATABASE_PORT', 5433),
      database: env('DATABASE_NAME', 'restaurant_db'),
      user: env('DATABASE_USERNAME', 'postgres'),
      password: env('DATABASE_PASSWORD', 'Applesauce@127'),
      ssl: env.bool('DATABASE_SSL', true) ? {
        rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
        ca: env('DATABASE_SSL_CA') ? fs.readFileSync(env('DATABASE_SSL_CA')).toString() : undefined,
        key: env('DATABASE_SSL_KEY') ? fs.readFileSync(env('DATABASE_SSL_KEY')).toString() : undefined,
        cert: env('DATABASE_SSL_CERT') ? fs.readFileSync(env('DATABASE_SSL_CERT')).toString() : undefined,
      } : false,
    },
    debug: false,
  },
});