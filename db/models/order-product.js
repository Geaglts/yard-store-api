const { Sequelize, Model, DataTypes } = require('sequelize');

const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');

const ORDER_PRODUCTS_TABLE = 'orders-products';

const OrderProductSchema = {
	id: {
		primaryKey: true,
		type: DataTypes.INTEGER,
		autoIncrement: true,
		allowNull: false,
	},
	amount: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	createdAt: {
		defaultValue: Sequelize.NOW,
		allowNull: false,
		type: DataTypes.DATE,
		field: 'created_at',
	},
	orderId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		field: 'order_id',
		references: {
			model: ORDER_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
	productId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		field: 'product_id',
		references: {
			model: PRODUCT_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
};

class OrderProduct extends Model {
	static associate() {}
	static config(sequelize) {
		return {
			sequelize,
			modelName: 'OrderProduct',
			tableName: ORDER_PRODUCTS_TABLE,
			timestamps: false,
		};
	}
}

module.exports = { ORDER_PRODUCTS_TABLE, OrderProductSchema, OrderProduct };
