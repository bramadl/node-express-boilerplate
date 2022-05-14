const compression = require('compression');
const cors = require('cors');
const express = require('express');
const fs = require('fs');
const helmet = require('helmet');
const httpStatus = require('http-status');
const path = require('path');
const xss = require('xss-clean');

const ApiError = require('./helpers/ApiError');
const ErrorContract = require('./helpers/ErrorContract');
const logger = require('./lib/logger');
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
    this.installCustomHandlers();
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
  }

  /**
   * Install the API routes from the api directory using
   * automatic discovery.
   */
  installRouteHandlers() {
    // this.app.use(swaggerRoute);

    const apiDiscoveries = fs.readdirSync(`${__dirname}/api`);

    if (!apiDiscoveries) throw new Error(ErrorContract.NO_API_FOLDER);
    if (!apiDiscoveries.length) throw new Error(ErrorContract.NO_API_FILES);

    apiDiscoveries.forEach((directory) => {
      if (directory.indexOf('.js') === -1) {
        try {
          const { name, router } = require(path.join(
            `${__dirname}/api/${directory}`,
          ));
          if (name && router) this.app.use(`/api/${name}`, router);
        } catch (error) {
          logger.error(error);
        }
      }
    });
  }

  /**
   * Install custom error handlers.
   */
  installCustomHandlers() {
    // Not found error handler.
    this.app.use((req, res, next) => {
      next(new ApiError(httpStatus.NOT_FOUND, 'Resource could not be found.'));
    });

    // Convert error to ApiError, if needed.
    this.app.use(errorConverter);

    // Central error handler.
    this.app.use(errorHandler);
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
