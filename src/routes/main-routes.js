const router = require('express').Router();

const basicRoute = '/api/category';

module.exports = () => {
  const mainRepository = require('../repositories/main-repository')();

  const mainService = require('../services/main-service')(mainRepository);

  const mainController = require('../controllers/main-controller')(mainService);

  const { addCategory, getAllCategories } = mainController;

  router.post(`${basicRoute}/add`, addCategory);
  router.get(`${basicRoute}/allCategories`, getAllCategories);

  return router;
};
