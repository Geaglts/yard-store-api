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
	async findByUser(userId) {
		const customer = await models.Customer.findOne({
			where: { '$user.id$': userId },
			include: ['user'],
		});
		if (!customer) throw boom.notFound('customer not found');
		const orders = await this.table.findAll({
			where: { customerId: customer.id },
			include: [{ association: 'items', through: { attributes: ['amount'] } }],
		});
		return { message: 'orders', body: orders };
	}
	async findOne({ id }) {
		const order = await this.table.findByPk(id, {
			// asociacion anidada
			include: [{ association: 'customer', include: ['user'] }, 'items'],
		});
		if (!order) throw boom.notFound('order not found');
		return { message: 'order', body: order };
	}
	async create({ userId }) {
		const customer = await models.Customer.findOne({
			where: { '$user.id$': userId },
			include: ['user'],
		});
		if (!customer) throw boom.notFound('customer not found');
		const newOrder = await this.table.create({ customerId: customer.id });
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
	// relation methods
	async addProduct({ productOrder }) {
		const order = await this.table.findByPk(productOrder.orderId);
		const product = await models.Product.findByPk(productOrder.orderId);
		if (!order || !product) throw boom.notFound('order or product not found');
		await models.OrderProduct.create(productOrder);
		return { message: 'product added to order ' };
	}
}

module.exports = OrdersService;
