const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Product, ProductSchema } = require('./product.model');
const { Category, CategorySchema } = require('./category.model');

function setupModels(sequelize) {
	User.init(UserSchema, User.config(sequelize));
	User.init(CustomerSchema, Customer.config(sequelize));
	User.init(ProductSchema, Product.config(sequelize));
	User.init(CategorySchema, Category.config(sequelize));
}

module.exports = setupModels;
