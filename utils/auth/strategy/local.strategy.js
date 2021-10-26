const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { Strategy } = require('passport-local');
const UsersService = require('../../../services/users.service');
const service = new UsersService();

const localStrategy = new Strategy(
	{
		usernameField: 'email',
	},
	async (username, password, done) => {
		try {
			const user = await service.findByEmail(username);
			if (!user) done(boom.unauthorized(), false);
			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) done(boom.unauthorized(), false);
			delete user.dataValues.password;
			delete user.dataValues.createdAt;
			done(null, user);
		} catch (error) {
			done(boom.unauthorized(), false);
		}
	}
);

module.exports = localStrategy;
