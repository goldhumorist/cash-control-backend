const BankClient = require('../models/Fake-bank-client');
const User = require('../models/User');

module.exports = () => {
  const signup = async ({ name, email, password }) => {
    const newUser = await User.create({ name, email, password });

    await BankClient.create({ origin_user_id: newUser.id, balance: '500' });

    return newUser;
  };
  return { signup };
};
