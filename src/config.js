const dotenv = require('dotenv');
dotenv.config();

const config = {
  port: process.env.PORT || 7777,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialect: process.env.DB_DIALECT,
  },
};

module.exports = { config };
