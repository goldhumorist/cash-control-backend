const createError = require('../errors-handle/createError');
const logger = require('../helpers/logger');
const uuid = require('uuid');
const logAlias = 'Piggy-bank-service';

const piggyBankService = (piggyBankRepository) => {
  // piggy Bank Service -> createNewPiggyBank()
  const createNewPiggyBank = async ({ userId, piggyBankTitle, goalSum }) => {
    logger.info(`${logAlias} create New PiggyBank PiggyBank`, {
      userId,
      piggyBankTitle,
      goalSum,
    });

    const piggyBank = {
      id: `Piggy-Bank:${uuid.v4()}`,
      piggy_bank_title: piggyBankTitle,
      goal_sum: goalSum,
      current_sum: '0',
      owner_id: userId,
    };

    try {
      await piggyBankRepository.createNewPiggyBank(piggyBank);

      return { piggyBank };
    } catch (error) {
      logger.error(error);
      throw createError('Can not create the piggy-bank', 500);
    }
  };

  // piggy Bank Service -> createNewPiggyBank()
  const topUpBank = async ({ userId, piggyBankId, sum }) => {
    logger.info(`${logAlias} top Up PiggyBank`, {
      userId,
      piggyBankId,
      sum,
    });

    try {
      const result = await piggyBankRepository.topUpPiggyBank(
        userId,
        piggyBankId,
        sum
      );

      return result;
    } catch (error) {
      logger.error(error);
      throw createError('Can not top up the piggy-bank', 500);
    }
  };

  // piggy Bank Service -> getMyPiggyBank()
  const getPiggyBank = async ({ userId, piggyBankId }) => {
    logger.info(`${logAlias} get PiggyBank`, userId);

    try {
      const piggyBank = await piggyBankRepository.getPiggyBank({
        userId,
        piggyBankId,
      });

      return piggyBank;
    } catch (error) {
      logger.error(error);
      throw createError('Can not get piggy-bank', 500);
    }
  };

  // piggy Bank Service -> getUserBalance()
  const getUserBalance = async ({ userId }) => {
    logger.info(`${logAlias} get User Balance`, userId);

    try {
      const userBalance = await piggyBankRepository.findBankUser({
        userId,
      });

      return { userBalance: userBalance.balance };
    } catch (error) {
      logger.error(error);
      throw createError('Can not get user balance', 500);
    }
  };

  // piggy Bank Service -> closePiggyBank()
  const closePiggyBank = async ({ userId }) => {
    logger.info(`${logAlias} close Piggy Bank`, {
      userId,
    });

    try {
      const result = await piggyBankRepository.closePiggyBank({ userId });

      return result;
    } catch (error) {
      logger.error(error);
      throw createError('Can not close the piggy-bank', 500);
    }
  };

  // piggy Bank Service -> closePiggyBank()
  const getAllPiggyBanks = async () => {
    logger.info(`${logAlias} Get all PiggyBanks`);

    try {
      const result = await piggyBankRepository.getAllPiggyBanks();

      return result.map((item) => item.dataValues);
    } catch (error) {
      logger.error(error);
      throw createError('Can not close the piggy-bank', 500);
    }
  };

  return {
    createNewPiggyBank,
    topUpBank,
    getPiggyBank,
    getUserBalance,
    closePiggyBank,
    getAllPiggyBanks,
  };
};

module.exports = piggyBankService;
