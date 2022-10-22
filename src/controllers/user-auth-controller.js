const createError = require('../errors-handle/createError');
const logger = require('../helpers/logger');

const logAlias = 'User-Auth-Controller';

const userAuthController = (userAuthService) => {
  // user controller -> heathcheck()
  const heathcheck = async (req, res) => {
    logger.info(`${logAlias} heathcheck`);

    res.status(200).json({ status: 'OK' });
  };

  // user controller -> checkAuth()
  const checkAuth = async (req, res) => {
    logger.info(`${logAlias} checkAuth`);

    res.status(200).end();
  };

  // user controller -> signup()
  const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    logger.info(`${logAlias} signup with data:`, { name, email, password });

    if (name && email && password) {
      try {
        const result = await userAuthService.signup({
          name,
          email,
          password,
        });

        return res.json(result);
      } catch (error) {
        return next(error);
      }
    }

    const error = createError('Incorrect Data for creating account', 400);
    return next(error);
  };

  // user controller -> login()
  const login = async (req, res, next) => {
    const { email, password } = req.body;

    logger.info(`${logAlias} login with data:`, { email, password });

    if (email && password) {
      try {
        const result = await userAuthService.login({
          email,
          password,
        });

        return res.json(result);
      } catch (error) {
        return next(error);
      }
    }

    const error = createError('Incorrect Data for login', 400);
    return next(error);
  };

  return { heathcheck, signup, login, checkAuth };
};

module.exports = userAuthController;
