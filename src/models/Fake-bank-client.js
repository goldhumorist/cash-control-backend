const Sequelize = require('sequelize');
const { DB } = require('../db');
const User = require('./User');

const BankClient = DB.define('bank_client', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  origin_user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
  balance: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = BankClient;
