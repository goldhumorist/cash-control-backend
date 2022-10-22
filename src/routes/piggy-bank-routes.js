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

  const { createNewPiggyBank, topUpBank } = piggyBankController;

  router.post(`${basicPiggyBankRoute}/add`, authenticate, createNewPiggyBank);
  router.patch(`${basicPiggyBankRoute}/topUpBank`, authenticate, topUpBank);

  return router;
};
