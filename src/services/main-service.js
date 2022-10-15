const createError = require('../errors-handle/createError');

const logAlias = 'Main-service';

const mainService = (mainRepository) => {
  // user service -> signup()
  const addCategory = async ({ userId, categoryTitle }) => {
    console.log(logAlias, { userId, categoryTitle });

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
  const getAllCategories = async ({ userId }) => {
    console.log(logAlias, { userId });

    let allCategories = await mainRepository.getAllCategories({
      userId,
    });

    allCategories = allCategories.map((category) => {
      return {
        categoryId: category.id,
        categoryTitle: category.category_title,
      };
    });

    return { categories: allCategories };
  };

  return { addCategory, getAllCategories };
};

module.exports = mainService;
