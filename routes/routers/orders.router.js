const { Router, response } = require('express');
const OrdersService = require('../../services/orders.service');
const reponse = require('../../utils/response');

const validationHandler = require('../../middlewares/validation.handler');
const {
	getOrderSchema,
	updateOrderSchema,
	createOrderSchema,
	addProductSchema,
} = require('../../schemas/order.schema');

const router = Router();
const service = new OrdersService();

router.get('/', async (req, res, next) => {
	try {
		const output = await service.find();
		reponse({ res, ...output });
	} catch (error) {
		next(error);
	}
});

router.post('/', validationHandler(createOrderSchema), async (req, res, next) => {
	const order = req.body;
	try {
		const output = await service.create({ order });
		reponse({ res, ...output, status: 201 });
	} catch (error) {
		next(error);
	}
});

router.post('/add-product', validationHandler(addProductSchema), async (req, res, next) => {
	const productOrder = req.body;
	try {
		const output = await service.addProduct({ productOrder });
		reponse({ res, ...output, status: 201 });
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validationHandler(getOrderSchema, 'params'), async (req, res, next) => {
	const { id } = req.params;
	try {
		const output = await service.findOne({ id });
		reponse({ res, ...output });
	} catch (error) {
		next(error);
	}
});

router.patch(
	'/:id',
	validationHandler(getOrderSchema, 'params'),
	validationHandler(updateOrderSchema),
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

router.delete('/:id', validationHandler(getOrderSchema, 'params'), async (req, res, next) => {
	const { id } = req.params;
	try {
		const output = await service.delete({ id });
		reponse({ res, ...output });
	} catch (error) {
		next(error);
	}
});

module.exports = router;
