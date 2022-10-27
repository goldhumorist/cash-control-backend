const createError = require('../errors-handle/createError');
const logger = require('../helpers/logger');

const logAlias = 'Piggy-Bank-Controller';

const piggyBankController = (piggyBankService) => {
  // piggy Bank Controller -> addNewPiggyBank()
  const createNewPiggyBank = async (req, res, next) => {
    const { piggyBankTitle, goalSum } = req.body;
    const { id: userId } = req.user;

    logger.info(`${logAlias} add New PiggyBank:`, { piggyBankTitle, goalSum });

    if (piggyBankTitle && goalSum) {
      try {
        const result = await piggyBankService.createNewPiggyBank({
          userId,
          piggyBankTitle,
          goalSum,
        });

        return res.json(result);
      } catch (error) {
        return next(error);
      }
    }

    const error = createError('Incorrect Data for creating a piggy bank', 400);
    return next(error);
  };

  // piggy Bank Controller -> getPiggyBank()
  const getPiggyBank = async (req, res, next) => {
    const { id: userId } = req.user;
    const { piggyBankId } = req.query;

    logger.info(`${logAlias} getPiggyBank:`, { userId, piggyBankId });

    try {
      let result;
      if (piggyBankId) {
        result = await piggyBankService.getPiggyBank({
          userId: null,
          piggyBankId,
        });
      } else {
        result = await piggyBankService.getPiggyBank({ userId });
      }

      return res.json(result);
    } catch (error) {
      return next(error);
    }
  };

  // piggy Bank Controller -> getUserBalace()
  const getUserBalance = async (req, res, next) => {
    const { id: userId } = req.user;

    logger.info(`${logAlias} getUserBalance:`, { userId });

    try {
      const result = await piggyBankService.getUserBalance({
        userId,
      });

      return res.json(result);
    } catch (error) {
      return next(error);
    }
  };

  // piggy Bank Controller -> topUpBank()
  const topUpBank = async (req, res, next) => {
    const { piggyBankId, sum } = req.body;
    const { id: userId } = req.user;

    logger.info(`${logAlias} topUp Bank PiggyBank:`, {
      piggyBankId,
      sum,
    });

    if (piggyBankId && sum) {
      try {
        const result = await piggyBankService.topUpBank({
          userId,
          piggyBankId,
          sum,
        });

        return res.json(result);
      } catch (error) {
        return next(error);
      }
    }

    const error = createError('Incorrect Data for creating a piggy bank', 400);
    return next(error);
  };

  // piggy Bank Controller -> closePiggyBank()
  const closePiggyBank = async (req, res, next) => {
    const { id: userId } = req.user;

    logger.info(`${logAlias} close Piggy Bank:`, {
      userId,
    });

    try {
      const result = await piggyBankService.closePiggyBank({
        userId,
      });

      return res.json(result);
    } catch (error) {
      return next(error);
    }
  };

  return {
    createNewPiggyBank,
    topUpBank,
    getPiggyBank,
    getUserBalance,
    closePiggyBank,
  };
};

module.exports = piggyBankController;
