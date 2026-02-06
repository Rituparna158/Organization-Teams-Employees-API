import { Router } from "express";
import teamController from "../controllers/teams";
import { authenticate } from "../middlewares/auth";
import { authorizePermissions } from "../middlewares/authorize-permissions";
//import organizationController from "../controllers/organization.controller";

const router = Router();
router.use(authenticate);
/**
 * @swagger
 * tags:
 *  - name: Teams
 *    description: Team management APIs
 */

/**
 * @swagger
 * /api/v1/teams:
 *   post:
 *     summary: Create a new team
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - organizationId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Backend
 *               organizationId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Teams created successfully
 */
router.post("/", authorizePermissions(["team:create"]), teamController.create);

/**
 * @swagger
 * /api/v1/teams:
 *   get:
 *     summary: Get all teams
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Teams
 */
router.get("/", authorizePermissions(["team:read"]), teamController.getAll);

/**
 * @swagger
 * /api/v1/teams/organization/{orgId}:
 *   get:
 *     summary: Get all team under an  organization
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orgId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Team featched successfully
 *       404:
 *         description: Team not found
 */
router.get(
  "/organization/:orgId",
  authorizePermissions(["team:read"]),
  teamController.getOrganizationId,
);
/**
 * @swagger
 * /api/v1/teams/{id}:
 *   get:
 *     summary: Get team by ID
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Team found
 *       404:
 *         description: Team not found
 */
router.get("/:id", authorizePermissions(["team:read"]), teamController.getById);

/**
 * @swagger
 * /api/v1/teams/{id}:
 *   put:
 *     summary: Update team by ID
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Team Name
 *     responses:
 *       200:
 *         description: Team Name updated successfully
 */
router.put(
  "/:id",
  authorizePermissions(["team:update"]),
  teamController.update,
);

/**
 * @swagger
 * /api/v1/teams/{id}:
 *   delete:
 *     summary: Delete Team by ID
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Team deleted successfully
 */
router.delete(
  "/:id",
  authorizePermissions(["team:delete"]),
  teamController.deleteById,
);

/**
 * @swagger
 * /api/v1/teams:
 *   delete:
 *     summary: Delete all Teams
 *     tags:
 *       - Teams
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All teams deleted successfully
 */
router.delete(
  "/",
  authorizePermissions(["team:delete"]),
  teamController.deleteAll,
);

export default router;
