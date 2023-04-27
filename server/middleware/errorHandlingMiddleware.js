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

const errorHandlingMiddleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    errorMessageLog(errorMessage);

    if (ctx.res.headerSent) {
      return next(error);
    }

    const errorResponse = {
      statusCode: getHttpStatusCode({ error, response: ctx.response }),
      body: undefined,
    };

    ctx.status = errorResponse.statusCode;

    ctx.type = 'application/json';
    ctx.body = { message: errorResponse.body };
  }
};

module.exports = { errorHandlingMiddleware };
