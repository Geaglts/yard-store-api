const { Router } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const response = require('../../utils/response');

const { config } = require('../../config/config');

function authApi(app) {
	const router = Router();
	app.use('/auth', router);

	router.post(
		'/login',
		passport.authenticate('local', { session: false }),
		async (req, res, next) => {
			try {
				const user = req.user;
				const payload = { sub: user.id, role: user.role };
				const token = jwt.sign(payload, config.jwtSecret);
				response({ res, body: { user, token } });
			} catch (error) {
				next(error);
			}
		}
	);
}

module.exports = authApi;
