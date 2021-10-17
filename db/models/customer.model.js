const { Sequelize, DataTypes, Model } = require('sequelize');

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
};

class Customer extends Model {
	static associate() {}

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
