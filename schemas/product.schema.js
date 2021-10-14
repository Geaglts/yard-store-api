const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(40);
const price = Joi.number().integer().min(10);

const createProductSchema = Joi.schema({
  name: name.required(),
  price: price.required(),
});

const updateProductSchema = Joi.schema({
  name,
  price,
});

const getProductSchema = Joi.schema({
  id,
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };
