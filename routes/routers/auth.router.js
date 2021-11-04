const { Router } = require('express');
const passport = require('passport');
const response = require('../../utils/response');

const validationHandler = require('../../middlewares/validation.handler');
const { recoverySchema, changePasswordSchema } = require('../../schemas/auth.schema');

const AuthService = require('../../services/auth.service');
const service = new AuthService();

function authApi(app) {
	const router = Router();
	app.use('/auth', router);

	router.post(
		'/login',
		passport.authenticate('local', { session: false }),
		async (req, res, next) => {
			try {
				const user = req.user;
				const body = service.signToken(user);
				response({ res, body });
			} catch (error) {
				next(error);
			}
		}
	);

	router.post('/recovery', validationHandler(recoverySchema), async (req, res, next) => {
		const { email } = req.body;
		try {
			const { message } = await service.sendRecovery(email);
			response({ res, message });
		} catch (error) {
			next(error);
		}
	});

	router.post(
		'/change-password',
		validationHandler(changePasswordSchema),
		async (req, res, next) => {
			const { token, newPassword } = req.body;
			try {
				const { message } = await service.changePassword({ token, newPassword });
				response({ res, message });
			} catch (error) {
				next(error);
			}
		}
	);
}

module.exports = authApi;
