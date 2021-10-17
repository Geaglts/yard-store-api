const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class CategoriesService {
	constructor() {
		this.table = models.Category;
	}
	async find() {
		const categories = await this.table.findAll();
		return { message: 'categories', body: categories };
	}
	async findOne({ id }) {
		const category = await this.table.findByPk(id);
		if (!category) throw boom.notFound('category not found');
		return { message: 'category', body: category };
	}
	async create({ category }) {
		const newCategory = await this.table.create(category);
		return { message: 'category added', body: newCategory };
	}
	async update({ id, updatedFields }) {
		const category = await this.table.findByPk(id);
		if (!category) throw boom.notFound('category not found');
		await category.update(updatedFields);
		return { message: 'updated category', body: category };
	}
	async delete({ id }) {
		const category = await this.table.findByPk(id);
		if (!category) throw boom.notFound('category not found');
		await category.destroy();
		return { message: 'deleted category', body: id };
	}
}

module.exports = CategoriesService;
