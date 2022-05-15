const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const UserRepository = require('../Users/UserRepository');
const {
  jwt: { expiry, secret },
} = require('../../config/env');
const ApiError = require('../../helpers/ApiError');

const prisma = new PrismaClient();

class AuthService {
  /**
   * Generate an access token with the given user.
   *
   * @param {User} user - The user model
   * @returns {Token}
   */
  generateAccessToken(user) {
    const {
      id,
      role: { name: role },
    } = user;
    const exp = moment().add(expiry, 'minutes').unix();

    const token = jwt.sign(
      {
        sub: id,
        iat: moment().unix(),
        exp,
        role,
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
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'No user with the given email is found.',
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new ApiError(httpStatus.FORBIDDEN, 'Credentials do not match.');
    }

    return prisma.user.findUnique({
      where: { email },
      select: UserRepository.user,
    });
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
    if (await prisma.user.findUnique({ where: { email } })) {
      throw new ApiError(httpStatus.CONFLICT, 'Email has been taken.');
    }

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: await bcrypt.hash(password, 10),
        roleId: 2, // DEFAULTS TO ADMIN
      },
      select: UserRepository.user,
    });

    return user;
  }
}

module.exports = new AuthService();
