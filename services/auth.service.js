const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('../config/config');

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

	signToken(user) {
		const payload = { sub: user.id, role: user.role };
		const token = jwt.sign(payload, config.jwtSecret);
		return { user, token };
	}

	async sendEmail(email) {
		const user = await this.userService.findByEmail(email);
		if (!user) throw boom.unauthorized();
		let transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com',
			port: 465,
			secure: true,
			auth: {
				user: config.mailEmail,
				pass: config.mailPassword,
			},
		});
		await transporter.sendMail({
			from: config.mailEmail,
			to: user.email,
			subject: 'Hola ✔',
			text: 'Hola',
			html: '<h1>Hola</h1>',
		});
		return { message: 'email sended' };
	}
}

module.exports = AuthService;
