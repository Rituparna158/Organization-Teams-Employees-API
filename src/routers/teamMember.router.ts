import { Router } from "express";
import teamMemberController from "../controllers/teamMember.controller";
import { authenticate } from "../middlewares/auth.middlewares";
import { authorizePermissions } from "../middlewares/authorizePermissions";

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   - name: Team Members
 *     description: Team membership management APIs
 */

/**
 * @swagger
 * /api/teams/{teamId}/members:
 *   post:
 *     tags:
 *       - Team Members
 *     summary: Add an employee to a team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - employeeId
 *             properties:
 *               employeeId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Employee added successfully
 */
router.post(
  "/:teamId/members",
  authorizePermissions(["team:manage-members"]),
  teamMemberController.create,
);

/**
 * @swagger
 * /api/teams/{teamId}/members:
 *   get:
 *     tags:
 *       - Team Members
 *     summary: Get all members of a team
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teamId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Team members fetched successfully
 */
router.get(
  "/:teamId/members",
  authorizePermissions(["team:read"]),
  teamMemberController.getMembers,
);

export default router;
