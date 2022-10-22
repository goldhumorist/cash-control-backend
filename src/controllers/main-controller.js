const createError = require('../errors-handle/createError');
const logger = require('../helpers/logger');

const logAlias = 'Main-Controller';

const mainController = (mainService) => {
  // main controller -> addCategory()
  const addCategory = async (req, res, next) => {
    const { categoryTitle } = req.body;
    const { id: userId } = req.user;

    logger.info(`${logAlias} add category:`, { userId, categoryTitle });

    if (categoryTitle) {
      try {
        const result = await mainService.addCategory({
          userId,
          categoryTitle,
        });

        return res.json(result);
      } catch (error) {
        return next(error);
      }
    }

    const error = createError('Incorrect Data for adding category', 400);
    return next(error);
  };

  // main controller -> getAllCategories()
  const getAllCategories = async (req, res, next) => {
    const { id: userId } = req.user;

    logger.info(`${logAlias} get all categories:`, { userId });

    try {
      const result = await mainService.getAllCategories({
        userId,
      });

      return res.json(result);
    } catch (error) {
      return next(error);
    }
  };

  const addPurchase = async (req, res, next) => {
    const { id: userId } = req.user;
    const { categoryId, purchaseTitle, purchasePrise } = req.body;

    logger.info(`${logAlias} addPurchase`, {
      userId,
      categoryId,
      purchaseTitle,
      purchasePrise,
    });

    if (categoryId && purchaseTitle && purchasePrise) {
      const result = await mainService.addPurchase({
        userId,
        purchaseTitle,
        purchasePrise,
        categoryId,
      });

      return res.json(result);
    }

    const error = createError('Incorrect Data for adding purchase', 400);
    return next(error);
  };

  const getAllPurchases = async (req, res, next) => {
    const { id: userId } = req.user;
    const { categoryId } = req.query;

    logger.info(`${logAlias} getAllPurchases`, {
      userId,
      categoryId,
    });

    if (categoryId) {
      const result = await mainService.getAllPurchases({
        userId,
        categoryId,
      });

      return res.json(result);
    }

    const error = createError('Incorrect Data for get purchases', 400);
    return next(error);
  };

  return { addCategory, getAllCategories, addPurchase, getAllPurchases };
};

module.exports = mainController;
