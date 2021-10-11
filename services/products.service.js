const faker = require('faker');

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
  create(product) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...product,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  find() {
    return this.products;
  }
  findOne(id) {
    const product = this.products.find((product) => {
      return (product.id = id);
    });
    if (!product) throw new Error('Product not found');
    return product;
  }
  update(id, updatedFields) {
    const index = this.products.findIndex(({ id: productId }) => {
      return productId === id;
    });
    if (index === -1) throw new Error('Product not found');
    this.products[index] = {
      ...this.products[index],
      ...updatedFields,
    };
    return this.products[index];
  }
  delete(id) {
    const index = this.products.findIndex(({ id: productId }) => {
      return productId === id;
    });
    if (index === -1) throw new Error('Product not found');
    this.products.splice(index, 1);
    return id;
  }
}

module.exports = ProductsService;
