const pool = require('../lib/postgres.pool');

class OrdersService {
	constructor() {
		this.orders = [];
		this.pool = pool;
		this.pool.on('error', (err) => {
			console.log(err);
		});
	}
	async create(orders) {
		return true;
	}
	async find() {
		const data = await this.pool.query('SELECT * FROM public.dummy;');
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
