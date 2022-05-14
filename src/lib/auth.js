const httpStatus = require('http-status');

const ApiError = require('../helpers/ApiError');
const ErrorContract = require('../helpers/ErrorContract');

/**
 * Returns a valid JWT token from request headers.
 *
 * @param {Express.Request.Authorization} authorization - The authorization headers
 * @return {String}
 */
const pickAuthorizationAsBearer = (authorization) => {
  if (!authorization) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      ErrorContract.INVALID_BEARER_TOKEN,
    );
  }

  const [prefix, token] = authorization.split(' ');
  if (prefix !== 'Bearer') {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      ErrorContract.INVALID_BEARER_TOKEN,
    );
  }

  return { token };
};

/**
 * Handle incoming requests under the given policy.
 *
 * @param {Policy} policyHandler - The policy handler injected.
 */
const auth = (policyHandler) => (req, res, next) => {
  const { token } = pickAuthorizationAsBearer(req.headers.authorization);
  if (!policyHandler(token)) throw new ApiError(httpStatus.FORBIDDEN, httpStatus[403]);
  next();
};

module.exports = auth;
