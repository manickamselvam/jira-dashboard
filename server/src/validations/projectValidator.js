const Joi = require('joi');

const createProjectSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('').max(500),
});

module.exports = { createProjectSchema };
