const path = require('path');
const dotenv = require('dotenv');
const Joi = require('joi');

const { error } = dotenv.config({ path: path.join(__dirname, '../../.env') });
if (process.env.NODE_ENV === 'development' && error) throw new Error('No environment file found.');

// Validate the environment
const envSchema = Joi.object()
  .keys({
    // DEFAULTS TO DEVELOPMENT
    NODE_ENV: Joi.string()
      .valid('production', 'staging', 'development', 'test')
      .default('development'),

    // DEFAULTS TO 3000
    PORT: Joi.number().default(3000),

    // DEFAULTS TO SECRET
    JWT_SECRET: Joi.string().default('SECRET').description('JWT secret key'),

    // DEFAULTS TO 1 DAY
    JWT_EXPIRY: Joi.number()
      .default(1440)
      .description('minutes after which access tokens expire'),

    // DEFAULTS TO 10 MINUTES
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),

    // DEFAULTS TO 10 MINUTES
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which verify email token expires'),
  })
  .unknown();

const { value: envVars, error: envError } = envSchema.validate(process.env);
if (envError) throw new Error(`Env validation error: ${envError}`);

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    expiry: envVars.JWT_EXPIRY,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
};
