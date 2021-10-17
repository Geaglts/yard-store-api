const { Router } = require('express');
const ProductsService = require('../../services/products.service');
const response = require('../../utils/response');

const validationHandler = require('../../middlewares/validation.handler');
const {
	getProductSchema,
	updateProductSchema,
	createProductSchema,
} = require('../../schemas/product.schema');

const router = Router();
const service = new ProductsService();

router.get('/', async (req, res, next) => {
	try {
		const output = await service.find();
		response({ res, ...output });
	} catch (error) {
		next(error);
	}
});

router.post('/', validationHandler(createProductSchema), async (req, res, next) => {
	const product = req.body;
	try {
		const output = await service.create({ product });
		response({ res, ...output, status: 201 });
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validationHandler(getProductSchema, 'params'), async (req, res, next) => {
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
	validationHandler(getProductSchema, 'params'),
	validationHandler(updateProductSchema),
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
	validationHandler(getProductSchema, 'params'),
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
