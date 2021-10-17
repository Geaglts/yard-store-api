const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(4);
const quantity = Joi.number().integer().min(1).max(25);
const img = Joi.string().uri();

const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	description: description.required(),
	img: img.required(),
	quantity: quantity.required(),
});

const updateProductSchema = Joi.object({
	name,
	price,
	description,
	img,
	quantity,
});

const getProductSchema = Joi.object({
	id,
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
