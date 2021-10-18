const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class CustomersService {
	constructor() {
		this.table = models.Customer;
	}
	async create({ customer }) {
		const newCustomer = await this.table.create(customer, { include: ['user'] });
		return { message: 'user added', body: newCustomer };
	}
	async find() {
		const customers = await this.table.findAll();
		return { message: 'customers', body: customers };
	}
	async findOne({ id }) {
		const customer = await this.table.findByPk(id, { include: ['user', 'orders'] });
		if (!customer) throw boom.notFound('customer not found');
		return { message: 'customer', body: customer };
	}
	async update({ id, updatedCustomer }) {
		const customer = await this.table.findByPk(id);
		if (!customer) throw boom.notFound('customer not found');
		await customer.update(updatedCustomer);
		return { message: `customer ${id} updated`, body: customer };
	}
	async delete({ id }) {
		const customer = await this.table.findByPk(id);
		if (!customer) throw boom.notFound('customer not found');
		await customer.destroy();
		return { message: `customer ${id} removed`, body: id };
	}
}

module.exports = CustomersService;
