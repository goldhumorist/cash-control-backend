const { config } = require('./config');
const { connectToDb } = require('./db');
const logger = require('./helpers/logger');

(async () => {
  const PORT = config.port;

  try {
    await connectToDb();

    const app = await require('./app')();

    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}!`);
    });
  } catch (err) {
    logger.error('Start Server is failed', err);
  }
})();
