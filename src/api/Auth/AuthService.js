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
    return jwt.sign(
      {
        sub: id,
        iat: moment().unix(),
        exp: moment().add(expiry, 'minutes').unix(),
        role: roleName,
      },
      secret,
    );
  }

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
