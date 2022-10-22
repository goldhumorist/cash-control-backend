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

  return { createNewPiggyBank, topUpBank };
};

module.exports = piggyBankService;
