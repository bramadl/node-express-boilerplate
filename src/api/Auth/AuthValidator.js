const Joi = require('joi');

const login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

const register = {
  body: {
    firstName: Joi.string().max(20).allow(null, '').optional(),
    lastName: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  },
};

module.exports = {
  login,
  register,
};
