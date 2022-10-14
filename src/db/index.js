const Sequelize = require('sequelize');
const { config } = require('../config');

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

    console.log(logAlias, 'succesfully connected to db');

    isConnectedToDb = true;

    await init();

    return DB;
  } catch (error) {
    console.log(logAlias, 'connection to db failed');
    throw error;
  }
};

const init = async () => {
  require('../models/User');
  require('../models/Category');
  require('../models/Purchase');

  await DB.sync(
    { force: false } // Reset db every time
  );
};

module.exports = {
  connectToDb,
  DB,
};
