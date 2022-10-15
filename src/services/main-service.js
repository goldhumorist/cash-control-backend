// const bcrypt = require('bcrypt');
const createError = require('../errors-handle/createError');
const rootRepository = require('../repositories/root-repository')();

const logAlias = 'Main-service';

const mainService = (mainRepository) => {
  // user service -> signup()
  const addCategory = async ({ email, categoryTitle }) => {
    console.log(logAlias, { email, categoryTitle });

    const user = await rootRepository.findUserByEmail(email);

    if (!user) {
      throw createError('User with this email does not exists!', 400);
    }

    const userId = user.dataValues.id;

    try {
      await mainRepository.addCategory({
        categoryTitle,
        userId,
      });
    } catch (error) {
      throw createError("Sorry, we can't add this category", 400);
    }

    return { status: 'Category has been added successfully' };
  };

  // user service -> getAllCategories()
  const getAllCategories = async ({ email }) => {
    console.log(logAlias, { email });

    const user = await rootRepository.findUserByEmail(email);

    if (!user) {
      throw createError('User with this email does not exists!', 400);
    }

    const userId = user.dataValues.id;

    let allCategories = await mainRepository.getAllCategories({
      userId,
    });

    allCategories = allCategories.map((category) => {
      return {
        categoryId: category.dataValues.id,
        categoryTitle: category.dataValues.category_title,
      };
    });

    return { categories: allCategories };
  };

  return { addCategory, getAllCategories };
};

module.exports = mainService;
