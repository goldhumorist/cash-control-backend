const User = require('../models/User');

module.exports = () => {
  const signup = async ({ name, email, password }) => {
    return User.create({ name, email, password });
  };
  return { signup };
};
