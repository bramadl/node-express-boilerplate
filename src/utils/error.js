/* eslint-disable no-unused-vars */
const httpStatus = require('http-status');

const ApiError = require('../helpers/ApiError');
const { env } = require('../config/env');
const logger = require('../lib/logger');

/**
 * Convert error to ApiError (base error class).
 *
 * @param {Express.error} err - The error object
 * @param {Express.Request} req - The express request
 * @param {Express.Response} res - The express response
 * @param {Express.NextFunction} next - The next function
 */
const errorConverter = (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    // could be from jwt, multer, or sequelize / mongoose error.
    logger.log({ error });

    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];

    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

/**
 * Handle the error based on the environment.
 * All error passed to this middleware should
 * be sent to the requesting user.
 *
 * @param {Express.error} err - The error object
 * @param {Express.Request} req - The express request
 * @param {Express.Response} res - The express response
 * @param {Express.NextFunction} next - The next function
 */
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  if (env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(env === 'development' && { stack: err.stack }),
  };

  // if (env === 'development') logger.error(err);
  res.status(statusCode).json(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
