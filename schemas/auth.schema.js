const Joi = require('joi');

const email = Joi.string().email();

const recoverySchema = Joi.object({
	email: email.required(),
});

const changePasswordSchema = Joi.object({
	token: Joi.string()
		.regex(/[a-zA-z0-9].[a-zA-z0-9].[a-zA-z0-9]/)
		.required(),
	newPassword: Joi.string().min(8).required(),
});

module.exports = { recoverySchema, changePasswordSchema };
