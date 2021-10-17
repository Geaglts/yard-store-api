const { Router } = require('express');
const router = Router();

const productsRouter = require('../routers/products.router');
const ordersRouter = require('../routers/orders.router');
const usersRouter = require('../routers/users.router');
const customersRouter = require('../routers/customers.router');
const categoriesRouter = require('../routers/categories.router');

function v1(app) {
	app.use('/api/v1', router);
	router.use('/products', productsRouter);
	router.use('/orders', ordersRouter);
	router.use('/users', usersRouter);
	router.use('/customers', customersRouter);
	router.use('/categories', categoriesRouter);
}

module.exports = v1;
