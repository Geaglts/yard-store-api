const { Sequelize, DataTypes, Model } = require('sequelize');

const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'customers';

const CustomerSchema = {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false,
		field: 'last_name',
	},
	phone: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	createdAt: {
		type: DataTypes.DATE,
		defaultValue: Sequelize.NOW,
		field: 'created_at',
		allowNull: false,
	},
	userId: {
		allowNull: false,
		type: DataTypes.INTEGER,
		field: 'user_id',
		unique: true,
		references: {
			model: USER_TABLE,
			key: 'id',
		},
		onUpdate: 'CASCADE',
		onDelete: 'SET NULL',
	},
};

class Customer extends Model {
	static associate(models) {
		this.belongsTo(models.User, { as: 'user' });
		this.hasMany(models.Order, { as: 'orders', foreignKey: 'customerId' });
	}

	static config(sequelize) {
		return {
			sequelize,
			tableName: CUSTOMER_TABLE,
			modelName: 'Customer',
			timestamps: false,
		};
	}
}

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };
