const fs = require('fs');
const path = require('path');

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('URL', 'https://myapp.local:1337'),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
  ssl: {
    key: fs.readFileSync(path.resolve(env('SSL_KEY_PATH', './certs/myapp.local-key.pem'))),
    cert: fs.readFileSync(path.resolve(env('SSL_CERT_PATH', './certs/myapp.local.pem'))),
  },
});