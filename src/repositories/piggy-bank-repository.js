const { DB } = require('../db');
const createError = require('../errors-handle/createError');
const logger = require('../helpers/logger');
const { BankClient } = require('../models');
const PiggyBank = require('../models/Piggy-bank');

const logAlias = 'Piggy Bank Repositoty';

module.exports = () => {
  const createNewPiggyBank = async (piggyBank) => {
    logger.info(`${logAlias} create New PiggyBank`, piggyBank);

    await PiggyBank.create(piggyBank);

    return piggyBank;
  };

  // find Bank User
  const findBankUser = async ({ userId }) => {
    logger.info(`${logAlias} find Bank User`, userId);

    const bankClient = await BankClient.findOne({
      where: { origin_user_id: userId },
    });

    if (bankClient) return bankClient;

    const error = createError('Can not find bank client', 500);

    logger.error(error);

    throw error;
  };

  // get Piggy Bank
  const getPiggyBank = async ({ userId, piggyBankId }) => {
    logger.info(`${logAlias} get PiggyBank`, { userId, piggyBankId });

    if (userId) {
      const piggyBank = await PiggyBank.findOne({
        where: { owner_id: userId },
      });

      if (piggyBank) return piggyBank;

      throw createError('Can not find piggy-bank');
    }

    const piggyBank = await PiggyBank.findOne({ where: { id: piggyBankId } });

    if (piggyBank) return piggyBank;

    throw createError('Can not find piggy-bank');
  };

  const topUpPiggyBank = async (userId, piggyBankId, sum) => {
    logger.info(`${logAlias} topUp PiggyBank`, { piggyBankId, sum });

    const transaction = await DB.transaction();

    let newBalanceofUser;
    let newBalanceOfPiggyBank;

    try {
      const bankClient = await findBankUser({ userId });

      const piggyBank = await getPiggyBank({ userId: null, piggyBankId });

      newBalanceofUser = Number(bankClient.balance) - Number(sum);

      newBalanceOfPiggyBank = Number(piggyBank.current_sum) + Number(sum);

      await BankClient.update(
        { balance: String(newBalanceofUser) },
        {
          where: { origin_user_id: userId },
        },
        { transaction }
      );

      await PiggyBank.update(
        { current_sum: String(newBalanceOfPiggyBank) },
        {
          where: { id: piggyBankId },
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw createError('Something went wrong', 500);
    }

    return {
      PiggyBankCurrentSum: newBalanceOfPiggyBank,
      userBalance: newBalanceofUser,
    };
  };

  const closePiggyBank = async ({ userId }) => {
    logger.info(`${logAlias} close Piggy Bank`, { userId });

    const transaction = await DB.transaction();

    let newBalanceofUser;

    try {
      const bankClient = await findBankUser({ userId });

      const piggyBank = await getPiggyBank({ userId });

      newBalanceofUser =
        Number(bankClient.balance) + Number(piggyBank.current_sum);

      await BankClient.update(
        { balance: String(newBalanceofUser) },
        {
          where: { origin_user_id: userId },
        },
        { transaction }
      );

      await PiggyBank.destroy(
        {
          where: { id: piggyBank.id },
        },
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();

      throw createError('Something went wrong', 500);
    }

    return {
      userBalance: newBalanceofUser,
    };
  };

  return {
    createNewPiggyBank,
    findBankUser,
    topUpPiggyBank,
    getPiggyBank,
    closePiggyBank,
  };
};
