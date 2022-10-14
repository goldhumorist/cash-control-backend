const router = require('express').Router();

module.exports = () => {
  const userAuthRepository = require('../repositories/user-auth-repository')();
  const userAuthService = require('../services/user-auth-service')(
    userAuthRepository
  );
  const userAuthController = require('../controllers/user-auth-controller')(
    userAuthService
  );

  const { heathcheck, signup, login } = userAuthController;

  router.get('/', heathcheck);
  router.post('/api/user/signup', signup);
  router.post('/api/user/login', login);

  return router;
};
