'use strict';

const { ORDER_PRODUCTS_TABLE, OrderProductSchema } = require('../models/order-product');

module.exports = {
	up: async (queryInterface) => {
		await queryInterface.createTable(ORDER_PRODUCTS_TABLE, OrderProductSchema);
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable(ORDER_PRODUCTS_TABLE);
	},
};
