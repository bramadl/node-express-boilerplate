const Joi = require('joi');

const login = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

const register = {
  body: {
    first_name: Joi.string().max(20).allow(null),
    last_name: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  },
};

module.exports = {
  login,
  register,
};
