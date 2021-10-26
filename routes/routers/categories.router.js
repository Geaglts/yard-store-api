const { Router } = require('express');
const passport = require('passport');
const response = require('../../utils/response');
const CategoriesService = require('../../services/categories.service');

const { checkApiKey, checkRols } = require('../../middlewares/auth.handler');
const validationHandler = require('../../middlewares/validation.handler');
const {
	getCategorySchema,
	createCategorySchema,
	updateCategorySchema,
} = require('../../schemas/category.schema');

const router = Router();
const service = new CategoriesService();

router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	checkApiKey,
	async (req, res, next) => {
		try {
			const output = await service.find();
			response({ res, ...output });
		} catch (error) {
			next(error);
		}
	}
);

router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	checkRols('admin'),
	validationHandler(createCategorySchema),
	async (req, res, next) => {
		const category = req.body;
		try {
			const output = await service.create({ category });
			response({ res, ...output, status: 201 });
		} catch (error) {
			next(error);
		}
	}
);

router.get('/:id', validationHandler(getCategorySchema, 'params'), async (req, res, next) => {
	const { id } = req.params;
	try {
		const output = await service.findOne({ id });
		response({ res, ...output });
	} catch (error) {
		next(error);
	}
});

router.patch(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validationHandler(getCategorySchema, 'params'),
	validationHandler(updateCategorySchema),
	async (req, res, next) => {
		const { id } = req.params;
		const updatedFields = req.body;
		try {
			const output = await service.update({ id, updatedFields });
			response({ res, ...output });
		} catch (error) {
			next(error);
		}
	}
);

router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	validationHandler(getCategorySchema, 'params'),
	async (req, res, next) => {
		const { id } = req.params;
		try {
			const output = await service.delete({ id });
			response({ res, ...output });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
