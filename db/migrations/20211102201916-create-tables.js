'use strict';

const { USER_TABLE } = require('../models/user.model');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { PRODUCT_TABLE } = require('../models/product.model');
const { CATEGORY_TABLE } = require('../models/category.model');
const { ORDER_TABLE } = require('../models/order.model');
const { ORDER_PRODUCTS_TABLE } = require('../models/order-product');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable(USER_TABLE, {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
			},
			email: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
				unique: true,
			},
			password: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
			},
			role: {
				allowNull: false,
				type: Sequelize.DataTypes.STRING,
				default: 'customer',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: 'created_at',
				defaultValue: Sequelize.NOW,
			},
		});

		await queryInterface.createTable(CUSTOMER_TABLE, {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			lastName: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
				field: 'last_name',
			},
			phone: {
				type: Sequelize.DataTypes.STRING,
				allowNull: true,
			},
			createdAt: {
				type: Sequelize.DataTypes.DATE,
				defaultValue: Sequelize.NOW,
				field: 'created_at',
				allowNull: false,
			},
			userId: {
				allowNull: false,
				type: Sequelize.DataTypes.INTEGER,
				field: 'user_id',
				unique: true,
				references: {
					model: USER_TABLE,
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
		});

		await queryInterface.createTable(CATEGORY_TABLE, {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: Sequelize.DataTypes.STRING,
				unique: true,
				allowNull: false,
			},
			image: {
				type: Sequelize.Sequelize.DataTypes.STRING,
				allowNull: false,
				defaultValue: 'https://dummyimage.com/100x100/6779a1/ffffff',
			},
			createdAt: {
				type: Sequelize.DataTypes.DATE,
				field: 'created_at',
				allowNull: false,
				defaultValue: Sequelize.NOW,
			},
		});

		await queryInterface.createTable(PRODUCT_TABLE, {
			id: {
				type: Sequelize.DataTypes.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			name: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			price: {
				type: Sequelize.DataTypes.FLOAT,
				allowNull: false,
			},
			description: {
				type: Sequelize.DataTypes.STRING,
				allowNull: false,
			},
			img: {
				type: Sequelize.DataTypes.STRING,
				allowNull: true,
				defaultValue: 'https://dummyimage.com/300x200/6779a1/ffffff',
			},
			quantity: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 0,
			},
			createdAt: {
				type: Sequelize.DataTypes.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
				field: 'created_at',
			},
			categoryId: {
				type: Sequelize.DataTypes.INTEGER,
				field: 'category_id',
				allowNull: false,
				references: {
					model: CATEGORY_TABLE,
					key: 'id',
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE',
			},
		});

		await queryInterface.createTable(ORDER_TABLE, {
			id: {
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
				autoIncrement: true,
				allowNull: false,
			},
			createdAt: {
				defaultValue: Sequelize.NOW,
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: 'created_at',
			},
			customerId: {
				type: Sequelize.DataTypes.INTEGER,
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

		await queryInterface.createTable(ORDER_PRODUCTS_TABLE, {
			id: {
				primaryKey: true,
				type: Sequelize.DataTypes.INTEGER,
				autoIncrement: true,
				allowNull: false,
			},
			amount: {
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
			},
			createdAt: {
				defaultValue: Sequelize.NOW,
				allowNull: false,
				type: Sequelize.DataTypes.DATE,
				field: 'created_at',
			},
			orderId: {
				type: Sequelize.DataTypes.INTEGER,
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
				type: Sequelize.DataTypes.INTEGER,
				allowNull: false,
				field: 'product_id',
				references: {
					model: PRODUCT_TABLE,
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'SET NULL',
			},
		});
	},
	down: async (queryInterface) => {
		await queryInterface.dropTable(USER_TABLE);
		await queryInterface.dropTable(CUSTOMER_TABLE);
		await queryInterface.dropTable(PRODUCT_TABLE);
		await queryInterface.dropTable(CATEGORY_TABLE);
		await queryInterface.dropTable(ORDER_TABLE);
		await queryInterface.dropTable(ORDER_PRODUCTS_TABLE);
	},
};
