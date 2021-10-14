function errorLog(err, req, res, next) {
  console.log(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    error: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    res.status(err.statusCode).json(err.payload);
  }
  next(err);
}

module.exports = { errorLog, errorHandler, boomErrorHandler };
