const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const {
  jwt: { expiry, secret },
} = require('../../config/env');

class AuthService {
  generateAccessToken(user) {
    const {
      id,
      role: { name: roleName },
    } = user;

    const exp = moment().add(expiry, 'minutes').unix();

    const token = jwt.sign(
      {
        sub: id,
        iat: moment().unix(),
        exp,
        role: roleName,
      },
      secret,
    );

    return {
      expiredIn: exp,
      token,
    };
  }

  /**
   * Sign in the user using email and password strategy.
   *
   * @param {String} email - The user email
   * @param {String} password - The user password
   * @returns {Promise<User>}
   */
  async signInWithEmailPassword(email, password) {
    return {
      id: 0,
      first_name: 'Bram',
      last_name: 'Adl',
      email,
      password: await bcrypt.hash(password, 10),
      role: {
        id: 0,
        name: 'Owner',
      },
    };
  }

  /**
   * Sign up the user using email and password strategy.
   *
   * @param {String} firstName - The user's first name
   * @param {String} lastName - The user's last name
   * @param {String} email - The user email
   * @param {String} password - The user password
   * @returns {Promise<User>}
   */
  async signUpWithEmailPassword(firstName, lastName, email, password) {
    return {
      id: 0,
      first_name: firstName,
      last_name: lastName,
      email,
      password: await bcrypt.hash(password, 10),
      role: {
        id: 0,
        name: 'Owner',
      },
    };
  }
}

module.exports = new AuthService();
