const Joi = require('joi');

const id = Joi.number().integer();
const orderId = Joi.number().integer();
const customerId = Joi.number().integer();

// product-order
const productId = Joi.number().integer();
const amount = Joi.number().integer();

const updateOrderSchema = Joi.object({
	customerId,
});

const addProductSchema = Joi.object({
	orderId: orderId.required(),
	productId: productId.required(),
	amount: amount.required(),
});

const getOrderSchema = Joi.object({
	id,
});

module.exports = { updateOrderSchema, addProductSchema, getOrderSchema };
