/* eslint-disable space-before-function-paren */
function notFound(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message });
}

module.exports = { notFound, errorHandler };
