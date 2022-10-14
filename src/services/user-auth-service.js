const bcrypt = require('bcrypt');
const createError = require('../errors-handle/createError');

const logAlias = 'User-auth-service';

const userAuthService = (userAuthRepository) => {
  // user service -> signup()
  const signup = async ({ name, email, password }) => {
    console.log(logAlias, { name, email, password });

    const isUserExists = await userAuthRepository.findUserByEmail(email);

    if (isUserExists) {
      throw createError('Email is already in use!', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userAuthRepository.signup({
      name,
      email,
      password: hashedPassword,
    });

    return { message: 'An Account successfully created', name, email };
  };

  // user service -> login()
  const login = async ({ email, password }) => {
    console.log(logAlias, { email, password });

    const user = await userAuthRepository.findUserByEmail(email);

    if (!user) throw createError('User does not exists.', 400);

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    if (!isPasswordCorrect) throw createError('Incorrect password.', 400);

    return { name: user.dataValues.name, email: user.dataValues.email };
  };

  return { signup, login };
};

module.exports = userAuthService;
