import { Router } from "express";
import useController from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middlewares";
import { authorizePermissions } from "../middlewares/authorizePermissions";

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User profile and role management APIs
 */

/**
 * @swagger
 * /api/v1/users/me:
 *   get:
 *     summary: Get logged-in user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile returned successfully
 */
router.get("/me", useController.me);

/**
 * @swagger
 * /api/v1/users/me:
 *   put:
 *     summary: Update logged-in user profile
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: updated@test.com
 *     responses:
 *       200:
 *         description: User profile updated successfully
 */
router.put("/me", useController.updateMe);

/**
 * @swagger
 * /api/v1/users/me/password:
 *   patch:
 *     summary: Update logged-in user password
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: newStrongPassword123
 *     responses:
 *       200:
 *         description: Password updated successfully
 */
router.patch("/me/password", useController.updatePassword);

/**
 * @swagger
 * /api/v1/users/me:
 *   delete:
 *     summary: Soft delete logged-in user account
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User deleted successfully
 */
router.delete("/me", useController.deleteMe);

/**
 * @swagger
 * /api/v1/users/{id}/roles:
 *   post:
 *     summary: Assign role to a user (Admin only)
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 example: admin
 *     responses:
 *       200:
 *         description: Role assigned successfully
 *       403:
 *         description: Permission denied
 */
router.post(
  "/:id/roles",
  authorizePermissions(["user:assign-role"]),
  useController.assignRole,
);

export default router;
