const { Router } = require('express');
const router = Router();

const productsRouter = require('../routers/v1/products.router')

function v1(app) {
  app.use('/api/v1', router);
  router.use('/products', productsRouter)
}

module.exports = v1;
