const BaseController = require('../BaseController');
const AuthService = require('./AuthService');

class UserController extends BaseController {
  /**
   * Login the user.
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.NextFunction} next
   */
  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await AuthService.signInWithEmailPassword(email, password);
      const token = await AuthService.generateAccessToken(user);
      super.OK(res, { user, token });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Register the user
   *
   * @param {Express.Request} req
   * @param {Express.Response} res
   * @param {Express.NextFunction} next
   */
  async register(req, res, next) {
    try {
      const {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      } = req.body;

      const user = await AuthService.signUpWithEmailPassword(
        firstName,
        lastName,
        email,
        password,
      );
      const token = await AuthService.generateAccessToken(user);
      super.CREATED(res, { user, token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
