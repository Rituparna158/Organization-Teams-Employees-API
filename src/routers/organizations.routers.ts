import { Router } from "express";
import organizationController from "../controllers/organization.controller";
import { authenticate } from "../middlewares/auth.middlewares";
import { authorizePermissions } from "../middlewares/authorizePermissions";

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
 * /api/v1/organizations:
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
router.get(
  "/",
  authorizePermissions(["organization:read"]),
  organizationController.getAll,
);

/**
 * @swagger
 * /api/v1/organizations/{id}:
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
router.get(
  "/:id",
  authorizePermissions(["organization:read"]),
  organizationController.getById,
);

/**
 * @swagger
 * /api/v1/organizations:
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
router.post(
  "/",
  authorizePermissions(["organization:create"]),
  organizationController.create,
);

/**
 * @swagger
 * /api/v1/organizations/{id}:
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
router.put(
  "/:id",
  authorizePermissions(["organization:update"]),
  organizationController.update,
);

/**
 * @swagger
 * /api/v1/organizations/{id}:
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
router.delete(
  "/:id",
  authorizePermissions(["organization:delete"]),
  organizationController.deleteById,
);

/**
 * @swagger
 * /api/v1/organizations:
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
router.delete(
  "/",
  authorizePermissions(["organization:delete"]),
  organizationController.deleteAll,
);

export default router;
