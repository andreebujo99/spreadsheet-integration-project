import { Router } from 'express';
import { authenticateJWT, authorize } from '../middlewares/auth.middleware';
import { createUser, getAllUsers, login } from '../controllers/auth.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and user
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: myPassword123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', login);

/**
 * @swagger
 * /api/auth/create:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user account. Requires authentication and proper permissions.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - ruoli
 *               - permessi
 *             properties:
 *               email:
 *                 type: string
 *                 example: newuser@email.com
 *               password:
 *                 type: string
 *                 example: securePassword
 *               ruoli:
 *                 type: string
 *                 example: User
 *               permessi:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Account.Read"]
 *     responses:
 *       201:
 *         description: User created successfully
 *       403:
 *         description: Forbidden — insufficient permissions
 */
router.post('/create', authenticateJWT, authorize('Account.Write'), createUser);

/**
 * @swagger
 * /api/auth:
 *   get:
 *     summary: Retrieve all users
 *     description: Returns the list of all registered users (without passwords).
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *       403:
 *         description: Forbidden — insufficient permissions
 */
router.get('/', authenticateJWT, authorize('Account.Read'), getAllUsers);

export default router;
