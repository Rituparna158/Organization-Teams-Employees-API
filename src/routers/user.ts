import { Router } from "express";
import userController from "../controllers/user";
import { authenticate } from "../middlewares/auth";
import { authorizePermissions } from "../middlewares/authorize-permissions";

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
 * /users/v1/me:
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
router.get("/me", userController.me);

/**
 * @swagger
 * /users/v1/me:
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
router.put("/me", userController.updateMe);

/**
 * @swagger
 * /users/v1/me/password:
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
router.patch("/me/password", userController.updatePassword);

/**
 * @swagger
 * /users/v1/me:
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
router.delete("/me", userController.deleteMe);

/**
 * @swagger
 * /users/v1/{id}/roles:
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
  userController.assignRole,
);

export default router;
