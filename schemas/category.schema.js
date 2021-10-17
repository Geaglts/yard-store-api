const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3);
const image = Joi.string().uri();

const createCategorySchema = Joi.object({
	name: name.required(),
	image,
});

const updateCategorySchema = Joi.object({
	name,
	image,
});

const getCategorySchema = Joi.object({
	id,
});

module.exports = { createCategorySchema, updateCategorySchema, getCategorySchema };
