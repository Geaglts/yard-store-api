const { Router } = require('express');
const passport = require('passport');
const { checkRols } = require('../../middlewares/auth.handler');
const response = require('../../utils/response');
const OrdersService = require('../../services/orders.service');

const router = Router();
const service = new OrdersService();

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	checkRols('admin', 'customer'),
	async (req, res, next) => {
		const user = req.user;
		try {
			const output = await service.findByUser(user.sub);
			response({ res, ...output });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
