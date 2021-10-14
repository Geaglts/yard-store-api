const { Router } = require('express');
const ProductsService = require('../../../services/products.service');

const router = Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.status(200).json({ products });
});

router.post('/', async (req, res) => {
  const { body } = req;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: 'created',
    data: newProduct,
  });
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const updatedProduct = await service.update(id, body);
    res.status(200).json({
      message: 'updated',
      data: updatedProduct,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await service.delete(id);
    res.status(200).json({
      message: 'deleted',
      id,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
