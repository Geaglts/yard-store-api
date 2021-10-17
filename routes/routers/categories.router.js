const { Router } = require('express');
const response = require('../../utils/response');
const CategoriesService = require('../../services/categories.service');

const validationHandler = require('../../middlewares/validation.handler');
const {
	getCategorySchema,
	createCategorySchema,
	updateCategorySchema,
} = require('../../schemas/category.schema');

const router = Router();
const service = new CategoriesService();

router.get('/', async (req, res, next) => {
	try {
		const output = await service.find();
		response({ res, ...output });
	} catch (error) {
		next(error);
	}
});

router.post('/', validationHandler(createCategorySchema), async (req, res, next) => {
	const category = req.body;
	try {
		const output = await service.create({ category });
		response({ res, ...output, status: 201 });
	} catch (error) {
		next(error);
	}
});

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
