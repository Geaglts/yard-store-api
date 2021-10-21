const { Pool } = require('pg');

const { config } = require('../config/config');

let options = {};
if (config.isProd) {
	options = {
		connectionString: config.databaseUrl,
		ssl: {
			rejectUnauthorized: false,
		},
	};
} else {
	const USER = encodeURIComponent(config.pgUser);
	const PASSWORD = encodeURIComponent(config.pgPassword);
	const URI = `postgres://${USER}:${PASSWORD}@${config.pgHost}:${config.pgPort}/${config.pgDatabase}`;
	options.connectionString = URI;
}

const pool = new Pool(options);

module.exports = pool;
