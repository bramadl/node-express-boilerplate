const Joi = require('joi');

const getUsers = {
  query: {
    per_page: Joi.number().positive().max(20),
    current_page: Joi.number().positive(),
    search: Joi.string().allow(null).optional(),
  },
};

const getUser = {
  params: {
    id: Joi.string().required(),
  },
};

const createUser = {
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
  },
};

const updateUser = {
  params: {
    id: Joi.string().required(),
  },
  body: {
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().optional(),
  },
};

const deleteUser = {
  params: {
    id: Joi.string().required(),
  },
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
