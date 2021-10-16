const { Router } = require('express');
const UsersService = require('../../../services/users.service');
const response = require('../../../utils/response');

const router = Router();
const service = new UsersService();

router.get('/', async (req, res, next) => {
	try {
		const data = await service.find();
		response({ res, message: 'all users', body: data });
	} catch (error) {
		next(error);
	}
});

router.post('/register', async (req, res, next) => {
	try {
		const user = req.body;
		const data = await service.register({ user });
		response({ res, ...data });
	} catch (error) {
		next(error);
	}
});

router.post('/login', async (req, res, next) => {
	try {
		const data = await service.login();
		response({ res, ...data });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
