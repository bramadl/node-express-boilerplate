class BaseController {
  OK(res, data, message = 'OK', statusCode = 200, ...params) {
    return res.status(statusCode).send({
      message,
      data,
      ...params,
    });
  }

  CREATED(res, data, message = 'CREATED', statusCode = 201, ...params) {
    return res.status(statusCode).send({
      message,
      data,
      ...params,
    });
  }

  NO_CONTENT(
    res,
    data = null,
    message = 'NO CONTENT',
    statusCode = 204,
    ...params
  ) {
    return res.status(statusCode).send({
      message,
      data,
      ...params,
    });
  }
}

module.exports = BaseController;
