function errorLog(err, req, res, next) {
  console.log(err);
  next(err);
}
