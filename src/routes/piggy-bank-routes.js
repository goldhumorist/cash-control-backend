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
  /**
   * @swagger
   * components:
   *   schemas:
   *     PiggyBank:
   *       type: object
   *       properties:
   *         id:
   *           type: number
   *           description: The id of the piggy-bank
   *         piggy_bank_title:
   *           type: string
   *           description: The name of the piggy-bank
   *         goal_sum:
   *           type: string
   *           description: The goal amount of the piggy-bank
   *         current_sum:
   *           type: string
   *           description: The current amount of the piggy-bank
   *         expired_time:
   *           type: date
   *           description: The date when piggy-bank will closed
   *         owner_id:
   *           type: number
   *           description: The user id who created the piggy-bank
   *       example:
   *         id: Piggy-Bank:4bd82470-2a6e-41c4-802d-2d0a637d01a1
   *         piggy_bank_title: For dinner
   *         goal_sum: 50
   *         current_sum: 10
   *         expired_time: null
   *         owner_id: 2
   *   securitySchemes:
   *    bearerAuth:
   *      type: http
   *      scheme: bearer
   *      bearerFormat: JWT
   */

  const {
    createNewPiggyBank,
    topUpBank,
    getPiggyBank,
    getUserBalance,
    closePiggyBank,
    getAllPiggyBanks,
  } = piggyBankController;

  /**
   * @swagger
   * /api/piggyBank/add:
   *   post:
   *     summary: Create a new category
   *     tags: [piggy-bank]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              piggyBankTitle:
   *                type: string
   *              goalSum:
   *                type: string
   *     responses:
   *       200:
   *         description: The piggy-bank
   *         content:
   *           application/json:
   *             schema:
   *                $ref: '#/components/schemas/PiggyBank'
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
  router.post(`${basicPiggyBankRoute}/add`, authenticate, createNewPiggyBank);

  /**
   * @swagger
   * /api/piggyBank/closePiggyBank:
   *   post:
   *     summary: Closes user's piggy-bank and all money goes to user's account
   *     tags: [piggy-bank]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: The piggy-bank was close and user gets money
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                userBalance:
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
  router.post(
    `${basicPiggyBankRoute}/closePiggyBank`,
    authenticate,
    closePiggyBank
  );

  /**
   * @swagger
   * /api/piggyBank/topUpBank:
   *   patch:
   *     summary: Top up the piggy-bank
   *     tags: [piggy-bank]
   *     security:
   *       - bearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              piggyBankId:
   *                type: string
   *              sum:
   *                type: string
   *     responses:
   *       200:
   *         description: The piggy-bank and user data
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                PiggyBankCurrentSum:
   *                  type: string
   *                userBalance:
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
  router.patch(`${basicPiggyBankRoute}/topUpBank`, authenticate, topUpBank);

  /**
   * @swagger
   * /api/piggyBank/getPiggyBank:
   *   get:
   *     summary: Returns the piggy-bank
   *     tags: [piggy-bank]
   *     parameters:
   *        - in: query
   *          name: piggyBankId
   *          schema:
   *            type: string
   *          required: false
   *          description: If piggyBankId is provided you'll get someone piggy-bank, if not you'll get your own piggybank data
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: The piggy-bank
   *         content:
   *           application/json:
   *             schema:
   *                $ref: '#/components/schemas/PiggyBank'
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
  router.get(`${basicPiggyBankRoute}/getPiggyBank`, authenticate, getPiggyBank);

  /**
   * @swagger
   * /api/piggyBank/getUserBalance:
   *   get:
   *     summary: (FAKE BANK) Returns balance of the user
   *     tags: [piggy-bank]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: The balance of the user was found
   *         content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                userBalance:
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
  router.get(
    `${basicPiggyBankRoute}/getUserBalance`,
    authenticate,
    getUserBalance
  );

  /**
   * @swagger
   * /api/piggyBank/getAllPiggyBanks:
   *   get:
   *     summary: Returns all Piggy Banks
   *     tags: [piggy-bank]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: The array with all Piggy Banks
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                  piggyBanks:
   *                    type: array
   *                    items:
   *                      $ref: '#/components/schemas/PiggyBank'
   *       401:
   *        description: Unauthorized Access - No Token Provided
   *        content:
   *          application/json:
   *            schema:
   *              type: object
   *              properties:
   *                message:
   *                  type: string
   */
  router.get(
    `${basicPiggyBankRoute}/getAllPiggyBanks`,
    authenticate,
    getAllPiggyBanks
  );

  return router;
};
