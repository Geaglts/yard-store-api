const { Sequelize, DataTypes, Model } = require('sequelize');

const PRODUCT_TABLE = 'products';

const ProductSchema = {
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		allowNull: false,
		autoIncrement: true,
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.FLOAT,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	img: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: 'https://dummyimage.com/300x200/6779a1/ffffff',
	},
	quantity: {
		type: DataTypes.NUMBER,
		allowNull: false,
		defaultValue: 0,
	},
	createdAt: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: Sequelize.NOW,
		field: 'created_at',
	},
};

class Product extends Model {
	static associate() {}

	static config(sequelize) {
		return {
			sequelize,
			tableName: PRODUCT_TABLE,
			modelName: 'Product',
			timestamps: false,
		};
	}
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product };
