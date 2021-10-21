'use strict';
const { DataTypes, Sequelize } = require('sequelize');

const { ORDER_TABLE } = require('../models/order.model');
const { CUSTOMER_TABLE } = require('../models/customer.model');

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.createTable(ORDER_TABLE, {
			id: {
				primaryKey: true,
				type: DataTypes.INTEGER,
				autoIncrement: true,
				allowNull: false,
			},
			createdAt: {
				defaultValue: Sequelize.NOW,
				allowNull: false,
				type: DataTypes.DATE,
				field: 'created_at',
			},
			customerId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				field: 'customer_id',
				references: {
					model: CUSTOMER_TABLE,
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
		});
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable(ORDER_TABLE);
	},
};
