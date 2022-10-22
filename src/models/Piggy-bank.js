const Sequelize = require('sequelize');
const { DB } = require('../db');
const User = require('./User');

const PiggyBank = DB.define('piggy-bank', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  piggy_bank_title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  goal_sum: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  current_cum: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  expired_time: {
    type: Sequelize.DATE,
    allowNull: true,
  },
  owner_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = PiggyBank;
