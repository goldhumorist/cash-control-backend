const Category = require('../models/Category');

const logAlias = 'Main Repositoty';

module.exports = () => {
  const addCategory = async ({ categoryTitle, userId }) => {
    console.log(logAlias, { categoryTitle, userId });

    return Category.create({
      category_title: categoryTitle,
      user_id: userId,
    });
  };

  const getAllCategories = async ({ userId }) => {
    console.log(logAlias, { userId });

    return Category.findAll({
      where: { user_id: userId },
    });
  };
  return { addCategory, getAllCategories };
};
