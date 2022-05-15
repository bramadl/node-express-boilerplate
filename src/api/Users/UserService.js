const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');

const UserRepository = require('./UserRepository');
const ApiError = require('../../helpers/ApiError');
const PaginationBuilder = require('../../helpers/PaginationBuilder');
const StrHelper = require('../../helpers/StrHelper');

const prisma = new PrismaClient();

class UserService {
  /**
   * Retrieve all the users data from database
   * with pagination strategy.
   *
   * @param {Express.Request.Query} query - The request query object
   * @param {String | undefined} query.current_page - The current page value as string
   * @param {String | undefined} query.per_page - The per page value as string
   * @param {String | undefined} query.search - The search value as string
   * @return {Promise<User[]>}
   */
  async getAllUsers(query) {
    const { search, perPage, currentPage } = PaginationBuilder.sanitizeQuery(query);

    const [total, data] = await prisma.$transaction([
      prisma.user.count(),
      prisma.user.findMany({
        ...(search !== '' && { where: UserRepository.filter(search) }),
        select: UserRepository.user,
        take: perPage,
        skip: perPage * (currentPage - 1),
        orderBy: { createdAt: 'asc' },
      }),
    ]);

    return {
      users: data,
      pagination: PaginationBuilder.buildPagination(
        currentPage,
        perPage,
        total,
      ),
    };
  }

  /**
   * Retrieve a user data from database
   * with the given id.
   *
   * @param {String} userId - The user id
   * @return {Promise<User>}
   */
  async getUserById(userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: UserRepository.user,
    });

    // No user with the given ID is found.
    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'The user with the given ID could not be found.',
      );
    }

    return user;
  }

  /**
   * Create a new user data to database
   * with the given request body.
   *
   * @param {Object} userBody - The request body payload
   * @param {String} userBody.firstName - The user first name
   * @param {String} userBody.lastName - The user last name
   * @param {String} userBody.email - The user email
   * @param {String | undefined} userBody.phoneNumber - The user phone
   * @return {Promise<User>}
   */
  async createUser(userBody) {
    // User with the given email has been registered.
    if (await prisma.user.findUnique({ where: { email: userBody.email } })) {
      throw new ApiError(
        httpStatus.CONFLICT,
        'A user with the given email has been registered.',
      );
    }

    const user = await prisma.user.create({
      data: {
        firstName: userBody.firstName,
        lastName: userBody.lastName,
        email: userBody.email,
        phoneNumber: userBody.phoneNumber,
        password: await bcrypt.hash(StrHelper.generateRandomString(), 10),
        roleId: 3, // DEFAULTS TO EDITOR
      },
      select: UserRepository.user,
    });

    return user;
  }

  /**
   * Update the user data from database
   * with the given id and request body.
   *
   * @param {String} userId - The user id
   * @param {Object} userBody - The request body payload
   * @param {String} userBody.firstName - The user first name
   * @param {String} userBody.lastName - The user last name
   * @param {String} userBody.email - The user email
   * @param {String | undefined} userBody.phoneNumber - The user phone
   * @return {Promise<User>}
   */
  async updateUser(userId, userBody) {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    // No user with the given id is found.
    if (!user) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'The user with the given ID could not be found.',
      );
    }

    const otherRegisteredEmail = await prisma.user.findMany({
      where: {
        id: {
          not: user.id,
        },
      },
    });

    // The email that the user tried to change has been taken.
    if (
      otherRegisteredEmail.map((_user) => _user.email).includes(userBody.email)
    ) {
      throw new ApiError(httpStatus.CONFLICT, 'Email has been taken.');
    }

    return prisma.user.update({
      where: { id: userId },
      data: {
        firstName: userBody.firstName,
        lastName: userBody.lastName,
        email: userBody.email,
        phoneNumber: StrHelper.nullifyEmptyString(userBody.phoneNumber),
      },
      select: UserRepository.user,
    });
  }

  /**
   * Delete a user data from database
   * with the given id.
   *
   * @param {String} userId - The user id
   */
  async deleteUser(userId) {
    // No user with the given id is found.
    if (!(await prisma.user.findUnique({ where: { id: userId } }))) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        'The user with the given ID could not be found.',
      );
    }

    await prisma.user.delete({ where: { id: userId } });
  }
}

module.exports = new UserService();
