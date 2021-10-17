const { Router } = require('express');
const CustomersService = require('../../services/customers.service');
const reponse = require('../../utils/response');

const validationHandler = require('../../middlewares/validation.handler');
const {
	getCustomerSchema,
	createCustomerSchema,
	updateCustomerSchema,
} = require('../../schemas/customer.schema');

const router = Router();
const service = new CustomersService();

router.get('/', async (req, res, next) => {
	try {
		const response = await service.find();
		reponse({ res, ...response });
	} catch (error) {
		next(error);
	}
});

router.post('/', validationHandler(createCustomerSchema), async (req, res, next) => {
	const customer = req.body;
	try {
		const response = await service.create({ customer });
		reponse({ res, ...response, status: 201 });
	} catch (error) {
		next(error);
	}
});

router.get('/:id', validationHandler(getCustomerSchema, 'params'), async (req, res, next) => {
	const { id } = req.params;
	try {
		const response = await service.findOne({ id });
		reponse({ res, ...response });
	} catch (error) {
		next(error);
	}
});
router.patch(
	'/:id',
	validationHandler(getCustomerSchema, 'params'),
	validationHandler(updateCustomerSchema),
	async (req, res, next) => {
		const { id } = req.params;
		const customer = req.body;
		try {
			const response = await service.update({ id, updatedCustomer: customer });
			reponse({ res, ...response });
		} catch (error) {
			next(error);
		}
	}
);
router.delete(
	'/:id',
	validationHandler(getCustomerSchema, 'params'),
	async (req, res, next) => {
		const { id } = req.params;
		try {
			const response = await service.delete({ id });
			reponse({ res, ...response });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
