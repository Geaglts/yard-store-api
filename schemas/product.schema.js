const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(4);
const quantity = Joi.number().integer().min(1).max(25);
const img = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const page = Joi.number().integer();

const createProductSchema = Joi.object({
	name: name.required(),
	price: price.required(),
	description: description.required(),
	img: img.required(),
	quantity: quantity.required(),
	categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
	name,
	price,
	description,
	img,
	quantity,
	categoryId,
});

const getProductSchema = Joi.object({
	id,
});

const queryProductSchema = Joi.object({
	limit,
	page,
});

module.exports = {
	createProductSchema,
	updateProductSchema,
	getProductSchema,
	queryProductSchema,
};
