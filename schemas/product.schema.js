const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const img = Joi.string().uri();
const quantity = Joi.number().integer().min(1).max(25);

const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	img: img.required(),
	quantity: quantity.required(),
});

const updateProductSchema = Joi.object({
	name,
	price,
	img,
	quantity,
});

const getProductSchema = Joi.object({
	id,
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
