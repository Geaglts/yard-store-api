const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../lib/sequelize');

class UsersService {
	constructor() {
		this.table = models.User;
	}
	async find() {
		const response = await this.table.findAll();
		return response;
	}
	async findOne(pk) {
		const response = await this.table.findByPk(pk, { include: ['customer'] });
		if (!response) throw new boom.notFound('user not found');
		return response;
	}
	async findByEmail(email) {
		const response = await this.table.findOne({ where: { email } });
		return response;
	}
	async register({ user }) {
		const hashedUser = await bcrypt.hash(user.password, 10);
		user.password = hashedUser;
		const response = await this.table.create(user);
		delete response.dataValues.password;
		return { message: 'usuario creado correctamente', body: response };
	}
	async update({ pk, data = {} }) {
		const response = await this.table.findByPk(pk);
		if (!response) throw new boom.notFound('user not found');
		await response.update(data);
		return { message: `user with pk ${pk} updated`, body: response };
	}
	async remove(pk) {
		const response = await this.table.findByPk(pk);
		if (!response) throw new boom.notFound('user not found');
		await response.destroy();
		return { message: `user with pk ${pk} removed`, body: pk };
	}
}

module.exports = UsersService;
