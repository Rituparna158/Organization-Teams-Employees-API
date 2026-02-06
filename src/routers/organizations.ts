import { Router } from "express";
import organizationController from "../controllers/organization";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   - name: Organizations
 *     description: Organization management APIs
 */

/**
 * @swagger
 * /api/organizations:
 *   get:
 *     summary: Get all organizations
 *     tags:
 *       - Organizations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of organizations
 */
router.get("/", organizationController.getAll);

/**
 * @swagger
 * /api/organizations/{id}:
 *   get:
 *     summary: Get organization by ID
 *     tags:
 *       - Organizations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Organization found
 *       404:
 *         description: Organization not found
 */
router.get("/:id", organizationController.getById);

/**
 * @swagger
 * /api/organizations:
 *   post:
 *     summary: Create a new organization
 *     tags:
 *       - Organizations
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: My Company
 *               location:
 *                 type: string
 *                 example: India
 *               industry:
 *                 type: string
 *                 example: IT
 *     responses:
 *       201:
 *         description: Organization created
 */
router.post("/", organizationController.create);

/**
 * @swagger
 * /api/organizations/{id}:
 *   put:
 *     summary: Update organization by ID
 *     tags:
 *       - Organizations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               location:
 *                 type: string
 *               industry:
 *                 type: string
 *     responses:
 *       200:
 *         description: Organization updated
 */
router.put("/:id", organizationController.update);

/**
 * @swagger
 * /api/organizations/{id}:
 *   delete:
 *     summary: Delete organization by ID
 *     tags:
 *       - Organizations
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Organization deleted
 */
router.delete("/:id", organizationController.deleteById);

/**
 * @swagger
 * /api/organizations:
 *   delete:
 *     summary: Delete all organizations
 *     tags:
 *       - Organizations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All organizations deleted
 */
router.delete("/", organizationController.deleteAll);

export default router;
