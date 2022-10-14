const Sequelize = require('sequelize');
const { DB } = require('../db');

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
});

module.exports = Category;
