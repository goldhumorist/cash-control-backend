const User = require('../models/User');

module.exports = () => {
  const findUserByEmail = async (email) => {
    return User.findOne({ where: { email } });
  };

  return { findUserByEmail };
};
