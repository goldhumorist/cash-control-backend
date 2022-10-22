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

  const findBankUser = async (userId) => {
    logger.info(`${logAlias} findBankUser`, userId);

    return BankClient.findOne({ where: { origin_user_id: userId } });
  };

  // const withdrawMoneyOfBankUser = async (userId, sum) => {
  //   logger.info(`${logAlias} withdraw Money Of Bank User`, { userId, sum });

  //   const bankClient = await BankClient.findOne({
  //     where: { origin_user_id: userId },
  //   });

  //   if (bankClient) {
  //     const newBalanceofUser = Number(bankClient.balance) - Number(sum);

  //     await BankClient.update(
  //       { balance: String(newBalanceofUser) },
  //       {
  //         where: { origin_user_id: userId },
  //       }
  //     );

  //     return newBalanceofUser;
  //   }

  //   throw createError('Can not find bank user', 500);
  // };

  const topUpPiggyBank = async (userId, piggyBankId, sum) => {
    logger.info(`${logAlias} topUp PiggyBank`, { piggyBankId, sum });

    const transaction = await DB.transaction();

    let newBalanceofUser;
    let newBalanceOfPiggyBank;

    try {
      const bankClient = await BankClient.findOne({
        where: { origin_user_id: userId },
      });
      const piggyBank = await PiggyBank.findOne({
        where: { id: piggyBankId },
      });

      if (bankClient && piggyBank) {
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
      } else {
        throw createError('Something went wrong', 500);
      }

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

  return {
    createNewPiggyBank,
    findBankUser,
    // withdrawMoneyOfBankUser,
    topUpPiggyBank,
  };
};
