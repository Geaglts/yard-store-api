const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../lib/sequelize');

class CustomersService {
	constructor() {
		this.table = models.Customer;
	}
	async create({ customer }) {
		const hashedUserPassword = await bcrypt.hash(customer.user.password, 10);
		const updatedCustomer = {
			...customer,
			user: {
				...customer.user,
				password: hashedUserPassword,
			},
		};
		const newCustomer = await this.table.create(updatedCustomer, { include: ['user'] });
		delete newCustomer.dataValues.user.dataValues.password;
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
