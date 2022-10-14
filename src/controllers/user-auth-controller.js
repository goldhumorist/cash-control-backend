const createError = require('../errors-handle/createError');

const logAlias = 'User-Auth-Controller';

const userAuthController = (userAuthService) => {
  // user controller -> heathcheck()
  const heathcheck = async (req, res) => {
    console.log(logAlias, 'heathcheck');

    res.status(200).json({ status: 'OK' });
  };

  // user controller -> signup()
  const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    console.log(logAlias, 'signup with data: ', { name, email, password });

    if (name && email && password) {
      try {
        const result = await userAuthService.signup({
          name,
          email,
          password,
        });

        return res.json(result);
      } catch (error) {
        next(error);
      }
    }

    const error = createError('Incorrect Data for creating account', 400);
    next(error);
  };

  // user controller -> login()
  const login = async (req, res, next) => {
    const { email, password } = req.body;

    console.log(logAlias, 'login with data: ', { email, password });

    if (email && password) {
      try {
        const result = await userAuthService.login({
          email,
          password,
        });

        return res.json(result);
      } catch (error) {
        next(error);
      }
    }

    const error = createError('Incorrect Data for login', 400);
    next(error);
  };

  return { heathcheck, signup, login };
};

module.exports = userAuthController;
