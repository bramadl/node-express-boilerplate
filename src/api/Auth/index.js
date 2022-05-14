const { Router } = require('express');

const validate = require('../../lib/validate');

const authValidator = require('./AuthValidator');
const authController = require('./AuthController');

const router = Router();

router.post('/login', validate(authValidator.login), authController.login);

router.post(
  '/register',
  validate(authValidator.register),
  authController.register,
);

module.exports = {
  name: 'auth',
  router,
};
