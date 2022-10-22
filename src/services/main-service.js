const createError = require('../errors-handle/createError');
const logger = require('../helpers/logger');

const logAlias = 'Main-service';

const mainService = (mainRepository) => {
  // user service -> signup()
  const addCategory = async ({ userId, categoryTitle }) => {
    logger.info(`${logAlias} add Category`, { userId, categoryTitle });

    let allCategories;

    try {
      allCategories = await mainRepository.addCategory({
        categoryTitle,
        userId,
      });

      allCategories = formatCategories(allCategories);
    } catch (error) {
      throw createError("Sorry, we can't add this category", 400);
    }

    return { categories: allCategories };
  };

  // user service -> getAllCategories()
  const getAllCategories = async ({ userId }) => {
    logger.info(`${logAlias} get All Categories with id`, { userId });

    let allCategories = await mainRepository.getAllCategories({
      userId,
    });

    allCategories = formatCategories(allCategories);

    return { categories: allCategories };
  };

  const addPurchase = async ({
    userId,
    purchaseTitle,
    purchasePrise,
    categoryId,
  }) => {
    logger.info(`${logAlias} add Purchase`, {
      userId,
      purchaseTitle,
      purchasePrise,
      categoryId,
    });

    let allPurchases = await mainRepository.addPurchase({
      userId,
      purchaseTitle,
      purchasePrise,
      categoryId,
    });

    allPurchases = formatPurchases(allPurchases);

    return { purchases: allPurchases };
  };

  const getAllPurchases = async ({ userId, categoryId }) => {
    logger.info(`${logAlias} get All Purchases`, {
      userId,
      categoryId,
    });

    let allPurchases = await mainRepository.getAllPurchases({
      userId,
      categoryId,
    });

    allPurchases = formatPurchases(allPurchases);

    return { purchases: allPurchases };
  };

  return { addCategory, getAllCategories, addPurchase, getAllPurchases };
};

module.exports = mainService;

const formatCategories = (categories) => {
  return categories.map((category) => {
    return {
      categoryId: category.id,
      categoryTitle: category.category_title,
    };
  });
};
const formatPurchases = (purchases) => {
  return purchases.map((purchase) => {
    return {
      purchaseId: purchase.id,
      purchaseTitle: purchase.purchase_title,
      purchasePrice: purchase.purchase_price,
      categoryId: purchase.category_id,
    };
  });
};
