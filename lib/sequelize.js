const { Sequelize } = require('sequelize');

const setupModels = require('../db/models');
const { config } = require('../config/config');

const USER = encodeURIComponent(config.pgUser);
const PASSWORD = encodeURIComponent(config.pgPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.pgHost}:${config.pgPort}/${config.pgDatabase}`;

const sequelize = new Sequelize(URI, {
	dialect: 'postgres',
	logging: true,
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
