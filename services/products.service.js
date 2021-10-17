const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class ProductsService {
	constructor() {
		this.table = models.Product;
	}

	async find() {
		const products = await this.table.findAll();
		return { message: 'products', body: products };
	}

	async findOne({ id }) {
		const product = await this.table.findByPk(id, { include: ['category'] });
		if (!product) throw boom.notFound('product not found');
		return { message: 'product', body: product };
	}

	async create({ product }) {
		const newProduct = await this.table.create(product);
		return { message: 'product added', body: newProduct };
	}

	async update({ id, updatedFields }) {
		const product = await this.table.findByPk(id);
		if (!product) throw boom.notFound('product not found');
		await product.update(updatedFields);
		return { message: 'updated product', body: product };
	}

	async delete({ id }) {
		const product = await this.table.findByPk(id);
		if (!product) throw boom.notFound('product not found');
		await product.destroy();
		return { message: 'deleted product', body: id };
	}
}

module.exports = ProductsService;
