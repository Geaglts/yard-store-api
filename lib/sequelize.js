const { Sequelize } = require('sequelize');

const { config } = require('../config/config');

const USER = encodeURIComponent(config.pgUser);
const PASSWORD = encodeURIComponent(config.pgPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.pgHost}:${config.pgPort}/${config.pgDatabase}`;

const sequelize = new Sequelize(URI, {
	dialect: 'postgres',
	logging: true,
});

module.exports = sequelize;
