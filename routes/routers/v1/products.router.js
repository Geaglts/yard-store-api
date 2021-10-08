const {Router} = require('express')
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
    })
  }
  res.json({ products })
})

module.exports = router;
