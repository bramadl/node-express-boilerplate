const BaseController = require('../BaseController');
const UserService = require('./UserService');

class UserController extends BaseController {
  /**
   * Get all users data.
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.NextFunction} next
   */
  async index(req, res, next) {
    try {
      const users = await UserService.getAllUsers(req.query);
      super.OK(res, users);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get the user data by the given ID.
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.NextFunction} next
   */
  async show(req, res, next) {
    try {
      const user = await UserService.getUserById(req.params.id);
      super.OK(res, user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create a new user data.
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.NextFunction} next
   */
  async store(req, res, next) {
    try {
      const user = await UserService.createUser(req.body);
      super.CREATED(res, user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update the user data by the given ID.
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.NextFunction} next
   */
  async update(req, res, next) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      super.OK(res, user);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete the user data by the given ID.
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.NextFunction} next
   */
  async destroy(req, res, next) {
    try {
      await UserService.deleteUser(req.params.id);
      super.NO_CONTENT(res);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
