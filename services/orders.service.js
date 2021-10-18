const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class OrdersService {
	constructor() {
		this.table = models.Order;
	}
	async find() {
		const orders = await this.table.findAll();
		return { message: 'orders', body: orders };
	}
	async findOne({ id }) {
		const order = await this.table.findByPk(id, { include: ['customer'] });
		if (!order) throw boom.notFound('order not found');
		return { message: 'order', body: order };
	}
	async create({ order }) {
		const newOrder = await this.table.create(order);
		return { message: 'order added', body: newOrder };
	}
	async update({ id, updatedFields }) {
		const order = await this.table.findByPk(id);
		if (!order) throw boom.notFound('order not found');
		await order.update(updatedFields);
		return { message: 'updated order', body: order };
	}
	async delete({ id }) {
		const order = await this.table.findByPk(id);
		if (!order) throw boom.notFound('order not found');
		await order.destroy();
		return { message: 'deleted order', body: id };
	}
}

module.exports = OrdersService;
