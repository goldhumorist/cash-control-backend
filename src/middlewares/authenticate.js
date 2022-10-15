const passport = require('passport');
const createError = require('../errors-handle/createError');

module.exports = (req, res, next) => {
  passport.authenticate('jwt', function (err, user, info) {
    if (err) return next(err);

    if (!user) {
      return next(createError('Unauthorized Access - No Token Provided!', 401));
    }

    req.user = user;

    return next();
  })(req, res, next);
};
