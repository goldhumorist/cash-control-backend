const User = require('../models/User');

module.exports = () => {
  const findUserByEmail = async (email) => {
    return User.findOne({ where: { email } });
  };

  const signup = async ({ name, email, password }) => {
    return User.create({ name, email, password });
  };
  return { findUserByEmail, signup };
};
