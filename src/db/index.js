const Sequelize = require('sequelize');
const { config } = require('../config');
const logger = require('../helpers/logger');

let isConnectedToDb = null;
const logAlias = 'Postgres';

const DB = new Sequelize(
  config.database.database,
  config.database.username,
  config.database.password,
  {
    host: config.database.host,
    dialect: 'postgres',
    logging: false,
  }
);

const connectToDb = async () => {
  if (isConnectedToDb) {
    return DB;
  }

  try {
    await DB.authenticate();

    logger.info(`${logAlias} succesfully connected to db`);

    isConnectedToDb = true;

    await init();

    return DB;
  } catch (error) {
    logger.error(`${logAlias} connection to db failed`);
    throw error;
  }
};

const init = async () => {
  require('../models/');

  await DB.sync(
    { force: false } // Reset db every time
  );
};

module.exports = {
  connectToDb,
  DB,
};
