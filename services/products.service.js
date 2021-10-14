const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  }
  generate() {
    const limit = 1;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        image: faker.image.imageUrl(),
      });
    }
  }
  async create(product) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }
  async findOne(id) {
    const product = this.products.find((product) => {
      return (product.id = id);
    });
    if (!product) throw boom.notFound('Product not found');
    return product;
  }
  async update(id, updatedFields) {
    const index = this.products.findIndex(({ id: productId }) => {
      return productId === id;
    });
    if (index === -1) throw boom.notFound('Product not found');
    this.products[index] = {
      ...this.products[index],
      ...updatedFields,
    };
    return this.products[index];
  }
  async delete(id) {
    const index = this.products.findIndex(({ id: productId }) => {
      return productId === id;
    });
    if (index === -1) throw boom.notFound('Product not found');
    this.products.splice(index, 1);
    return id;
  }
}

module.exports = ProductsService;
