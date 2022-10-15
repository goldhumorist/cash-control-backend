const router = require('express').Router();

module.exports = () => {
  const userAuthRepository = require('../repositories/user-auth-repository')();
  const userAuthService = require('../services/user-auth-service')(
    userAuthRepository
  );
  const userAuthController = require('../controllers/user-auth-controller')(
    userAuthService
  );

  const { heathcheck, signup, login } = userAuthController;

  /**
   * @swagger
   * components:
   *   schemas:
   *     User:
   *       type: object
   *       required:
   *         - name
   *         - email
   *         - token
   *       properties:
   *         name:
   *           type: string
   *           description: The name of the user
   *         email:
   *           type: string
   *           description: The the email of the user
   *         token:
   *           type: string
   *           description: The jwt token
   *       example:
   *         name: John
   *         email: john@gmail.com
   *         token: eyJhbGciOiJIUzI1NiIs...
   */

  /**
   * @swagger
   * /:
   *   get:
   *     summary: Endpoint for checking is server alive
   *     tags: [Healthcheck]
   *     responses:
   *       200:
   *         description: Server Alive
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 status:
   *                  type: string
   */
  router.get('/', heathcheck);

  /**
   * @swagger
   * /api/user/signup:
   *   post:
   *     summary: Create an account
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              name:
   *                type: string
   *              email:
   *                type: string
   *              password:
   *                type: string
   *     responses:
   *       200:
   *         description: Account has been created successfully
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/User'
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
  router.post('/api/user/signup', signup);

  /**
   * @swagger
   * /api/user/login:
   *   post:
   *     summary: Login into an account
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *        application/json:
   *          schema:
   *            type: object
   *            properties:
   *              email:
   *                type: string
   *              password:
   *                type: string
   *     responses:
   *       200:
   *         description: Login data is correct
   *         content:
   *           application/json:
   *             schema:
   *              $ref: '#/components/schemas/User'
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
  router.post('/api/user/login', login);

  return router;
};
