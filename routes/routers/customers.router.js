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

router.get('/', findCustomers);
router.post('/', validationHandler(createCustomerSchema), addCustomer);
router.get('/:id', validationHandler(getCustomerSchema, 'params'), findCustomer);
router.patch(
	'/:id',
	validationHandler(getCustomerSchema, 'params'),
	validationHandler(updateCustomerSchema),
	updateCustomer
);
router.delete('/:id', validationHandler(getCustomerSchema, 'params'), deleteCustomer);

const findCustomers = async (req, res, next) => {
	try {
		const response = await service.find();
		reponse({ res, ...response });
	} catch (error) {
		next(error);
	}
};

const addCustomer = async (req, res, next) => {
	try {
		const response = await service.create();
		reponse({ res, ...response, status: 201 });
	} catch (error) {
		next(error);
	}
};

const findCustomer = async (req, res, next) => {
	const { id } = req.params;
	try {
		const response = await service.findOne({ id });
		reponse({ res, ...response });
	} catch (error) {
		next(error);
	}
};

const updateCustomer = async (req, res, next) => {
	const { id } = req.params;
	const customer = req.body;
	try {
		const response = await service.update({ id, updatedCustomer: customer });
		reponse({ res, ...response });
	} catch (error) {
		next(error);
	}
};

const deleteCustomer = async (req, res, next) => {
	const { id } = req.params;
	try {
		const response = await service.delete({ id });
		reponse({ res, ...response });
	} catch (error) {
		next(error);
	}
};
