const { Model, Sequelize, DataTypes } = require('sequelize');

const CATEGORY_TABLE = 'categories';

const CategorySchema = {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
	},
	name: {
		type: DataTypes.STRING,
		unique: true,
		allowNull: false,
	},
	image: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	createdAt: {
		type: DataTypes.STRING,
		field: 'created_at',
		allowNull: false,
		defaultValue: Sequelize.NOW,
	},
};

class Category extends Model {
	static associate() {}

	static config(sequelize) {
		return {
			sequelize,
			modelName: 'Category',
			tableName: CATEGORY_TABLE,
			timestamps: false,
		};
	}
}

module.exports = { CATEGORY_TABLE, CategorySchema, Category };
