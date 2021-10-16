const boom = require('@hapi/boom');
const { models } = require('../lib/sequelize');
const { report } = require('../routes/routers/users.router');

class UsersService {
	constructor() {
		this.users = [];
	}
	async find() {
		const response = await models.User.findAll();
		return response;
	}
	async findOne(pk) {
		const response = await models.User.findByPk(pk);
		if (!response) throw new boom.notFound('user not found');
		return response;
	}
	async register({ user }) {
		const response = await models.User.create(user);
		return { message: 'usuario creado correctamente', body: response };
	}
	async login() {
		return true;
	}
	async remove(pk) {
		const response = await models.User.findByPk(pk);
		if (!response) throw new boom.notFound('user not found');
		await response.destroy();
		return { message: `user with pk ${pk} removed`, body: pk };
	}
}

module.exports = UsersService;
