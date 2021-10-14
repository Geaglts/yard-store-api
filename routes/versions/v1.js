const { Router } = require('express');
const router = Router();

const productsRouter = require('../routers/v1/products.router');
const ordersRouter = require('../routers/v1/orders.router');

function v1(app) {
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/orders', ordersRouter);
}

module.exports = v1;
