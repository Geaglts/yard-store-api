const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const UsersService = require('./users.service');

class AuthService {
	constructor() {
		this.userService = new UsersService();
	}

	async getUser(email, password) {
		const user = await this.userService.findByEmail(email);
		if (!user) throw boom.unauthorized();
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw boom.unauthorized();
		delete user.dataValues.password;
		delete user.dataValues.createdAt;
		return user;
	}
}

module.exports = AuthService;
