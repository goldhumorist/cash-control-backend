const Sequelize = require('sequelize');
const { DB } = require('../db');
const Category = require('./Category');
const User = require('./User');

const Purchase = DB.define('purchases', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  purchase_title: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  purchase_price: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  category_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Category,
      key: 'id',
    },
  },
});

module.exports = Purchase;
