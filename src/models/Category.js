const Sequelize = require('sequelize');
const { DB } = require('../db');
const User = require('./User');

const Category = DB.define('categories', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  category_title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
});

module.exports = Category;
