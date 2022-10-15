const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerOptions = require('../swagger');

const specs = swaggerJsDoc(swaggerOptions);

const { notFound, errorHandler } = require('./errors-handle/errors');
const passport = require('passport');

module.exports = async () => {
  const app = express();

  const userAuthRoutes = require('./routes/user-auth-routes')();
  const mainRoutes = require('./routes/main-routes')();

  app.use(cors());
  app.use(express.json());

  app.use(passport.initialize());
  require('./middlewares/jwt')(passport);

  app.use(userAuthRoutes);
  app.use(mainRoutes);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
