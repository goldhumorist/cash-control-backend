const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const { config } = require('../config');
const rootRepository = require('../repositories/root-repository')();

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT.sercet,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
      rootRepository
        .findUserByEmail(jwtPayload.email)
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err) => {
          return done(err, false, { message: 'Server Error' });
        });
    })
  );
};
