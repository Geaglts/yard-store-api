const { Sequelize, Model, DataTypes } = require('sequelize');

const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'orders';

const OrderSchema = {
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
};

class Order extends Model {
	static associate(models) {
		this.belongsTo(models.Customer, { as: 'customer' });
		this.belongsToMany(models.Product, {
			as: 'items',
			through: models.OrderProduct,
			foreignKey: 'orderId',
			otherKey: 'productId',
		});
	}
	static config(sequelize) {
		return {
			sequelize,
			modelName: 'Order',
			tableName: ORDER_TABLE,
			timestamps: false,
		};
	}
}

module.exports = { ORDER_TABLE, OrderSchema, Order };
