const { Pool } = require('pg');

const { config } = require('../config/config');

const USER = encodeURIComponent(config.pgUser);
const PASSWORD = encodeURIComponent(config.pgPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.pgHost}:${config.pgPort}/${config.pgDatabase}`;

const pool = new Pool({ connectionString: URI });

module.exports = pool;
