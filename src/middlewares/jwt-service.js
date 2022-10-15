/* eslint-disable space-before-function-paren */
const jwt = require('jsonwebtoken');
const createError = require('../errors-handle/createError');

const JWT_CONFIGURATION = {
  expiresIn: '24h',
};

module.exports = {
  sign({ email }) {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: JWT_CONFIGURATION.expiresIn,
    });
  },

  verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
      if (error) {
        throw createError('Incorrect or expired link.', 400);
      }

      return decodedToken;
    });
  },
};
