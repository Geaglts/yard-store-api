const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');

class CustomersService {
	constructor() {}
	async create({ customer }) {
		const newCustomer = await models.Customer.create(customer, { include: ['user'] });
		return { message: 'user added', body: newCustomer };
	}
	async find() {
		const customers = await models.Customer.findAll();
		return { message: 'customers', body: customers };
	}
	async findOne({ id }) {
		const customer = await models.Customer.findByPk(id, { include: ['user'] });
		if (!customer) throw boom.notFound('customer not found');
		return { message: 'customer', body: customer };
	}
	async update({ id, updatedCustomer }) {
		const customer = await models.Customer.findByPk(id);
		if (!customer) throw boom.notFound('customer not found');
		await customer.update(updatedCustomer);
		return { message: `customer ${id} updated`, body: customer };
	}
	async delete({ id }) {
		const customer = await models.Customer.findByPk(id);
		if (!customer) throw boom.notFound('customer not found');
		await customer.destroy();
		return { message: `customer ${id} removed`, body: id };
	}
}

module.exports = CustomersService;
