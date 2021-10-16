const sequelize = require('../lib/sequelize');

class OrdersService {
	constructor() {
		this.orders = [];
	}
	async create(orders) {
		return true;
	}
	async find() {
		const query = 'SELECT * FROM public.dummy;';
		const [data] = await sequelize.query(query);
		return data;
	}
	async findOne(id) {
		return true;
	}
	async delete(id) {
		return true;
	}
}

module.exports = OrdersService;
