const chalk = require('chalk');
const { port } = require('./src/config/env');
const logger = require('./src/lib/logger');
const { errorTypes } = require('./src/config/globals');
const App = require('./src/App');

class Server {
  server = null;

  /**
   * Get the application instance then attach
   * node express common error handlers.
   *
   * @param {Express.Application} Application - The express app
   */
  constructor(Application) {
    this.server = Application.getInstance();

    process.on('SIGTERM', (error) => this.errorHandler(error, errorTypes.SIGTERM));
    process.on('uncaughtException', (error) => this.errorHandler(error, errorTypes.UNCAUGHT_EXCEPTION));
    process.on('unhandledRejection', (error) => this.errorHandler(error, errorTypes.UNHANDLED_REJECTION));
  }

  /**
   * Start the server instance.
   * @param {Boolean} isClusterRequired - Setup cluster or not.
   */
  start() {
    this.server.listen(port, () => {
      logger.info(
        `${chalk.bold('Listening')}: ${chalk.underline.blue(
          `http://localhost:${port}`,
        )}`,
      );
    });
  }

  /**
   * Stop the server instance.
   */
  stop() {
    if (this.server) {
      this.server.close(() => {
        logger.info('Server closed.');
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  }

  /**
   * Hooks for handling the errors.
   * We can do anything with the error object.
   * Here we just simply output it to console using logger instance.
   *
   * @param {Error} error
   */
  errorHandler(error, type) {
    if (type === 'SIGTERM') {
      logger.info(chalk.red('[SIGTERM RECEIVED] Shutting down gracefully 👋'));
    } else {
      logger.error(chalk.red(`[${type}] Shutting down 💥`));
      logger.warn(`${chalk.bold.yellow('error')}: `, error);
      logger.warn(`${chalk.bold.yellow('errorName')}: `, error.name);
      logger.warn(`${chalk.bold.yellow('errorMessage')}: `, error.message);
      logger.warn(`${chalk.bold.yellow('errorStack')}: `, error.stack);
    }

    this.stop();
  }
}

const server = new Server(App);
server.start();
