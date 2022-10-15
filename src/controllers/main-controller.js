const createError = require('../errors-handle/createError');

const logAlias = 'Main-Controller';

const mainController = (mainService) => {
  // main controller -> addCategory()
  const addCategory = async (req, res, next) => {
    const { categoryTitle } = req.body;
    const { id: userId } = req.user;

    console.log(logAlias, ' add category: ', { userId, categoryTitle });

    if (categoryTitle) {
      try {
        const result = await mainService.addCategory({
          userId,
          categoryTitle,
        });

        return res.json(result);
      } catch (error) {
        next(error);
      }
    }

    const error = createError('Incorrect Data for adding category', 400);
    next(error);
  };

  // main controller -> getAllCategories()
  const getAllCategories = async (req, res, next) => {
    const { id: userId } = req.user;

    console.log(logAlias, ' get all categories: ', { userId });

    try {
      const result = await mainService.getAllCategories({
        userId,
      });

      return res.json(result);
    } catch (error) {
      next(error);
    }
  };

  return { addCategory, getAllCategories };
};

module.exports = mainController;
