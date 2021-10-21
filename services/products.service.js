const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../lib/sequelize');

class ProductsService {
	constructor() {
		this.table = models.Product;
	}

	async find(query) {
		const totalProducts = await this.table.count();
		const options = { include: ['category'], where: {} };
		const { limit, page } = query;
		const pagination = { totalProducts: totalProducts };
		if (limit && page && page > 0) {
			const totalPages = Math.ceil(totalProducts / limit);
			options.limit = limit;
			options.offset = (page > 1 ? page - 1 : 0) * limit;
			pagination.products = parseInt(limit);
			pagination.page = parseInt(page);
			pagination.totalPages = totalPages;
		}

		const { price } = query;
		if (price) {
			options.where.price = price;
		}

		const { price_min, price_max } = query;
		if (price_min && price_max) {
			options.where.price = {
				[Op.gte]: price_min,
				[Op.lte]: price_max,
			};
		}

		const products = await this.table.findAll(options);

		if (price_min && price_max) {
			pagination.products = products.length;
		}

		return {
			message: 'products',
			body: {
				pagination,
				data: products,
			},
		};
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
