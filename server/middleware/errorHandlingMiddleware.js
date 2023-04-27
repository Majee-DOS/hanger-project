const getErrorMessage = (error) => {
  if (error.stack) {
    return error.stack;
  }
  if (typeof error.toString === 'function') {
    return error.toString();
  }
  return '';
};

const errorMessageLog = (error) => {
  console.error(error);
};

const checkErrorStatusCode = (status) => {
  return status >= 400 && status < 600;
};

const getHttpStatusCode = ({ error, response }) => {
  const errorStatusCode = error.status || error.statusCode;
  if (checkErrorStatusCode(errorStatusCode)) {
    return errorStatusCode;
  }
  const responseStatusCode = response.statusCode;
  if (checkErrorStatusCode(responseStatusCode)) {
    return responseStatusCode;
  }

  return 500;
};

const errorHandlingMiddleware = (error, request, response, next) => {
  const errorMessage = getErrorMessage(error);

  errorMessageLog(errorMessage);

  if (response.headerSent) {
    return next(error);
  }

  const errorResponse = {
    statusCode: getHttpStatusCode({ error, response }),
    body: undefined,
  };

  response.status(errorResponse.statusCode);

  response.format({
    json: () => {
      response.json({ message: errorResponse.body });
    },
    default: () => {
      response.type('text/plain').send(errorResponse.body);
    },
  });
  next();
};

module.export = { errorHandlingMiddleware };
