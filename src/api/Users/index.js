const { Router } = require('express');

const auth = require('../../lib/auth');
const validate = require('../../lib/validate');

const userPolicy = require('./UserPolicy');
const userValidator = require('./UserValidator');
const userController = require('./UserController');

const router = Router();

router.get(
  '/',
  auth(userPolicy.getUsers),
  validate(userValidator.getUsers),
  userController.index,
);

router.get(
  '/:id',
  auth(userPolicy.getUserById),
  validate(userValidator.getUser),
  userController.show,
);

router.post(
  '/',
  auth(userPolicy.createUser),
  validate(userValidator.createUser),
  userController.store,
);

router.patch(
  '/:id',
  auth(userPolicy.updateUser),
  validate(userValidator.updateUser),
  userController.update,
);

router.delete(
  '/:id',
  auth(userPolicy.deleteUser),
  validate(userValidator.deleteUser),
  userController.destroy,
);

module.exports = {
  name: 'users',
  router,
};
