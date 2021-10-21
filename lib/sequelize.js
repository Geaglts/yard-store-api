const { Sequelize } = require('sequelize');

const setupModels = require('../db/models');
const { config } = require('../config/config');

let options = { dialect: 'postgres' };
if (config.isProd) {
	options = {
		dialectOptions: {
			ssl: {
				rejectUnauthorized: false,
			},
		},
	};
} else {
	options = {
		logging: true,
	};
}

const sequelize = new Sequelize(config.databaseUrl, options);

setupModels(sequelize);

module.exports = sequelize;
