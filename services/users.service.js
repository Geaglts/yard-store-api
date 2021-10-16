const { models } = require('../lib/sequelize');

class UsersService {
	constructor() {
		this.users = [];
	}
	async find() {
		const response = await models.User.findAll();
		return response;
	}
	async register({ user }) {
		return { message: 'usuario creado correctamente', body: user };
	}
	async login() {
		return true;
	}
}

module.exports = UsersService;
