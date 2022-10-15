const authenticate = require('../middlewares/authenticate');

const router = require('express').Router();

const basicRoute = '/api/category';

module.exports = () => {
  const mainRepository = require('../repositories/main-repository')();

  const mainService = require('../services/main-service')(mainRepository);

  const mainController = require('../controllers/main-controller')(mainService);

  const { addCategory, getAllCategories } = mainController;
  /**
   * @swagger
   * components:
   *   schemas:
   *     Category:
   *       type: object
   *       required:
   *         - categoryId
   *         - categoryTitle
   *       properties:
   *         categoryId:
   *           type: number
   *           description: The auto-generated id of the category
   *         categoryTitle:
   *           type: string
   *           description: The category title
   *       example:
   *         categoryId: 1
   *         categoryTitle: Food
   *   securitySchemes:
   *    bearerAuth:
   *      type: http
   *      scheme: bearer
   *      bearerFormat: JWT
   */

  /**
   * @swagger
   * /api/category/allCategories:
   *   get:
   *     summary: Returns the list of all the categories
   *     tags: [Category]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: The list of the categories
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 categories:
   *                  type: array
   *                  items:
   *                    $ref: '#/components/schemas/Category'
   */
  router.get(`${basicRoute}/allCategories`, authenticate, getAllCategories);

  /**
   * @swagger
   * /api/category/add:
   *   post:
   *     summary: Create a new category
   *     tags: [Category]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              categoryTitle:
   *                type: string
   *     responses:
   *       200:
   *         description: The successfully responce
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                  type: string
   *       400:
   *        description: You provided wrong values
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  router.post(`${basicRoute}/add`, authenticate, addCategory);

  return router;
};
