const { Router } = require('express')
const faker = require('faker')

const router = Router();

router.get('/', (req, res) => {
  const products = [];
  const { limit = 10 } = req.query;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price()),
      image: faker.image.imageUrl()
    });
  };
  res.status(200).json({ products });
});

router.post('/', (req, res) => {
  const { body } = req;
  res.status(201).json({
    message: 'created',
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req;
  res.status(200).json({
    message: 'updated',
    data: body,
    id
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    message: 'deleted',
    id
  });
});

module.exports = router;
