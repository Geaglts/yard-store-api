const { Sequelize } = require('sequelize');

const setupModels = require('../db/models');
const { config } = require('../config/config');

let options = { dialect: 'postgres' };
let uri = '';
if (config.isProd) {
	options = {
		logging: true,
	};
	uri = config.databaseUrl;
} else {
	options = {
		dialectOptions: {
			ssl: {
				rejectUnauthorized: false,
			},
		},
	};
	const USER = encodeURIComponent(config.pgUser);
	const PASSWORD = encodeURIComponent(config.pgPassword);
	const URI = `postgres://${USER}:${PASSWORD}@${config.pgHost}:${config.pgPort}/${config.pgDatabase}`;
	uri = URI;
}

const sequelize = new Sequelize(uri, options);

setupModels(sequelize);

module.exports = sequelize;
