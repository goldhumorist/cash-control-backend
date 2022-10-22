const logger = require('../helpers/logger');
const { Purchase } = require('../models');
const Category = require('../models/Category');

const logAlias = 'Main Repositoty';

module.exports = () => {
  const addCategory = async ({ categoryTitle, userId }) => {
    logger.info(`${logAlias} add Category`, { categoryTitle, userId });

    await Category.create({
      category_title: categoryTitle,
      user_id: userId,
    });

    return getAllCategories({ userId });
  };

  const getAllCategories = async ({ userId }) => {
    logger.info(`${logAlias} get All Categories`, { userId });

    return Category.findAll({
      where: { user_id: userId },
    });
  };

  const addPurchase = async ({
    userId,
    purchaseTitle,
    purchasePrise,
    categoryId,
  }) => {
    logger.info(`${logAlias} addPurchase`, {
      userId,
      purchaseTitle,
      purchasePrise,
      categoryId,
    });

    await Purchase.create({
      purchase_title: purchaseTitle,
      purchase_price: purchasePrise,
      category_id: categoryId,
      user_id: userId,
    });

    return getAllPurchases({ userId, categoryId });
  };

  const getAllPurchases = async ({ userId, categoryId }) => {
    logger.info(`${logAlias} get All Purchases`, { userId, categoryId });

    return await Purchase.findAll({
      where: { user_id: userId, category_id: categoryId },
    });
  };

  return { addCategory, getAllCategories, addPurchase, getAllPurchases };
};
