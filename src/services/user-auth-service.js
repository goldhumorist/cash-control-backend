const bcrypt = require('bcrypt');
const createError = require('../errors-handle/createError');
const jwtService = require('../middlewares/jwt-service');
const rootRepository = require('../repositories/root-repository')();

const logAlias = 'User-auth-service';

const userAuthService = (userAuthRepository) => {
  // user service -> signup()
  const signup = async ({ name, email, password }) => {
    console.log(logAlias, { name, email, password });

    const isUserExists = await rootRepository.findUserByEmail(email);

    if (isUserExists) {
      throw createError('Email is already in use!', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await userAuthRepository.signup({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwtService.sign({ email });

    return { name, email, token };
  };

  // user service -> login()
  const login = async ({ email, password }) => {
    console.log(logAlias, { email, password });

    const user = await rootRepository.findUserByEmail(email);

    if (!user) throw createError('User does not exists.', 400);

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    if (!isPasswordCorrect) throw createError('Incorrect password.', 400);

    const token = jwtService.sign({ email });

    return { name: user.name, email: user.email, token };
  };

  return { signup, login };
};

module.exports = userAuthService;
