import { Router } from "express";
import teamController from "../controllers/teams.contoller";
import { authenticate } from "../middlewares/auth.middlewares";
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
 * /api/teams:
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
router.post("/", teamController.create);

/**
 * @swagger
 * /api/teams/{id}:
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
router.get("/:id", teamController.getById);

/**
 * @swagger
 * /api/teams:
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
router.get("/", teamController.getAll);

/**
 * @swagger
 * /api/teams/organization/{orgId}:
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
router.get("/organization/:orgId", teamController.getOrganizationId);

/**
 * @swagger
 * /api/teams/{id}:
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
router.put("/:id", teamController.update);

/**
 * @swagger
 * /api/teams/{id}:
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
router.delete("/:id", teamController.deleteById);

/**
 * @swagger
 * /api/teams:
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
router.delete("/", teamController.deleteAll);

export default router;
