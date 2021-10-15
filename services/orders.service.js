const getConnection = require('../lib/postgres');

class OrdersService {
	constructor() {
		this.orders = [];
	}
	async create(orders) {
		return true;
	}
	async find() {
		const client = await getConnection();
		const data = await client.query('SELECT * FROM public.dummy;');
		return data.rows;
	}
	async findOne(id) {
		return true;
	}
	async delete(id) {
		return true;
	}
}

module.exports = OrdersService;
