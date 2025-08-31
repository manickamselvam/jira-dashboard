const Joi = require('joi');
const mongoose = require('mongoose');

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow('').max(500),
  status: Joi.string().valid('todo', 'in-progress', 'done').default('todo'),
  projectId: Joi.string().custom(objectIdValidator).required(),
  assignedTo: Joi.string().custom(objectIdValidator).optional(),
});

module.exports = { createTaskSchema };
