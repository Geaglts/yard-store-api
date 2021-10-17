const Joi = require('joi');

const { createUserSchema } = require('./user.schema');

const id = Joi.number().integer();
const name = Joi.string().min(2);
const lastName = Joi.string().min(2);
const phone = Joi.string().min(10);

const createCustomerSchema = Joi.object({
	name: name.required(),
	lastName: lastName.required(),
	phone: phone.required(),
	user: createUserSchema,
});

const updateCustomerSchema = Joi.object({
	name,
	lastName,
	phone,
});

const getCustomerSchema = Joi.object({
	id,
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };
