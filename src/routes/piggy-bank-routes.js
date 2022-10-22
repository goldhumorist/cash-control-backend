const authenticate = require('../middlewares/authenticate');

const router = require('express').Router();

const basicPiggyBankRoute = '/api/piggyBank';

module.exports = () => {
  const piggyBankRepository =
    require('../repositories/piggy-bank-repository')();

  const piggyBankService = require('../services/piggy-bank-service')(
    piggyBankRepository
  );

  const piggyBankController = require('../controllers/piggy-bank-controller')(
    piggyBankService
  );

  const {
    createNewPiggyBank,
    topUpBank,
    getPiggyBank,
    getUserBalance,
    closePiggyBank,
  } = piggyBankController;

  router.post(`${basicPiggyBankRoute}/add`, authenticate, createNewPiggyBank);
  router.post(
    `${basicPiggyBankRoute}/closePiggyBank`,
    authenticate,
    closePiggyBank
  );
  router.patch(`${basicPiggyBankRoute}/topUpBank`, authenticate, topUpBank);
  router.get(`${basicPiggyBankRoute}/getPiggyBank`, authenticate, getPiggyBank);

  // fake bank
  router.get(
    `${basicPiggyBankRoute}/getUserBalace`,
    authenticate,
    getUserBalance
  );

  return router;
};
