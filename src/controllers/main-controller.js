const createError = require('../errors-handle/createError');

const logAlias = 'Main-Controller';

const mainController = (mainService) => {
  // main controller -> addCategory()
  const addCategory = async (req, res, next) => {
    const { email, categoryTitle } = req.body;

    console.log(logAlias, ' add category: ', { email, categoryTitle });

    if (email && categoryTitle) {
      try {
        const result = await mainService.addCategory({
          email,
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
    const { email } = req.body;

    console.log(logAlias, ' get all categories: ', { email });

    if (email) {
      try {
        const result = await mainService.getAllCategories({
          email,
        });

        return res.json(result);
      } catch (error) {
        next(error);
      }
    }

    const error = createError('Incorrect Data for getting categories', 400);
    next(error);
  };

  return { addCategory, getAllCategories };
};

module.exports = mainController;
