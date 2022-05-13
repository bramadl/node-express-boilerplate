const compression = require('compression');
const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const httpStatus = require('http-status');
const xss = require('xss-clean');

const ApiError = require('./helpers/ApiError');
const morgan = require('./lib/morgan');
const { errorConverter, errorHandler } = require('./utils/error');

class Application {
  app = null;

  /**
   * Initialize app with express then install
   * express middlewares and route handlers.
   */
  constructor() {
    this.app = express();

    this.installMiddlewares();
    this.installRouteHandlers();
  }

  installMiddlewares() {
    // Use morgan log formatter.
    this.app.use(morgan.successHandler);
    this.app.use(morgan.errorHandler);

    // Set security HTTP headers.
    this.app.use(helmet());

    // Parse json and urlencoded request body.
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Sanitize request data.
    this.app.use(xss());

    // GZIP compression
    this.app.use(compression());

    // Enable cors
    this.app.use(cors());
    this.app.options('*', cors());

    // Not found error handler.
    this.app.use((req, res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, 'Resource could not be found.'));
    });

    // Convert error to ApiError, if needed.
    this.app.use(errorConverter);

    // Central error handler.
    this.app.use(errorHandler);
  }

  installRouteHandlers() {
    // this.app.use(swaggerRoute);

    this.app.get('/', (req, res) => {
      res.send('OK');
    });
  }

  /**
   * Get the express application.
   *
   * @returns {Express.Application}
   */
  getInstance() {
    return this.app;
  }
}

module.exports = new Application();
