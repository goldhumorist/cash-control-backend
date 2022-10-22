const authenticate = require('../middlewares/authenticate');

const router = require('express').Router();

const basicCategoryRoute = '/api/category';
const basicPurchaseRoute = '/api/purchase';

module.exports = () => {
  const mainRepository = require('../repositories/main-repository')();

  const mainService = require('../services/main-service')(mainRepository);

  const mainController = require('../controllers/main-controller')(mainService);

  const { addCategory, getAllCategories, addPurchase, getAllPurchases } =
    mainController;
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
   *     Purchase:
   *       type: object
   *       properties:
   *         purchaseId:
   *           type: number
   *           description: The auto-generated id of the purchase
   *         categoryId:
   *           type: number
   *           description: The auto-generated id of the category
   *         purchaseTitle:
   *           type: string
   *           description: The title of the purchase
   *         purchasePrice:
   *           type: string
   *           description: The price of the purchase
   *       example:
   *         purchaseId: 1
   *         purchaseTitle: Products
   *         purchasePrice: 20
   *         categoryId: 1
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
  router.get(
    `${basicCategoryRoute}/allCategories`,
    authenticate,
    getAllCategories
  );

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
   *                 categories:
   *                  type: array
   *                  items:
   *                    $ref: '#/components/schemas/Category'
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
  router.post(`${basicCategoryRoute}/add`, authenticate, addCategory);

  /**
   * @swagger
   * /api/purchase/allPurchases:
   *   get:
   *     summary: get all purchases from the category
   *     tags: [Purchase]
   *     parameters:
   *        - in: path
   *          name: categoryId
   *          schema:
   *            type: integer
   *          required: true
   *          description: ID of the Category
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: The successfully responce
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 categories:
   *                  type: array
   *                  items:
   *                    $ref: '#/components/schemas/Purchase'
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
  router.get(
    `${basicPurchaseRoute}/allPurchases`,
    authenticate,
    getAllPurchases
  );

  /**
   * @swagger
   * /api/purchase/add:
   *   post:
   *     summary: Add a new purchase to the category
   *     tags: [Purchase]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              categoryId:
   *                type: string
   *     responses:
   *       200:
   *         description: The successfully responce
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 categories:
   *                  type: array
   *                  items:
   *                    $ref: '#/components/schemas/Purchase'
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
  router.post(`${basicPurchaseRoute}/add`, authenticate, addPurchase);

  return router;
};
