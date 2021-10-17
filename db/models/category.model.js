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
		defaultValue: 'https://dummyimage.com/100x100/6779a1/ffffff',
	},
	createdAt: {
		type: DataTypes.DATE,
		field: 'created_at',
		allowNull: false,
		defaultValue: Sequelize.NOW,
	},
};

class Category extends Model {
	static associate(models) {
		this.hasMany(models.Product, { as: 'products', foreignKey: 'categoryId' });
	}

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
