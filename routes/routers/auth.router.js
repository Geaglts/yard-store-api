const passport = require('passport');
const { Router } = require('express');
const response = require('../../utils/response');

function authApi(app) {
	const router = Router();
	app.use('/auth', router);

	router.post(
		'/login',
		passport.authenticate('local', { session: false }),
		async (req, res, next) => {
			try {
				response({ res, body: req.user });
			} catch (error) {
				next(error);
			}
		}
	);
}

module.exports = authApi;
