const express = require('express');
const cors = require('cors');

const { notFound, errorHandler } = require('./errors-handle/errors');

module.exports = async () => {
  const app = express();

  const userAuthRoutes = require('./routes/user-auth-routes')();
  const mainRoutes = require('./routes/main-routes')();

  app.use(cors());
  app.use(express.json());

  app.use(userAuthRoutes);
  app.use(mainRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
