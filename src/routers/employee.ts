import { Router } from "express";
import employeeController from "../controllers/employee";
import { authenticate } from "../middlewares/auth";
import { authorizePermissions } from "../middlewares/authorize-permissions";

const router = Router();

router.use(authenticate);
/**
 * @swagger
 * tags:
 *   - name: Employees
 *     description: Employee management APIs
 */
/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *              - name
 *              - email
 *              - phone
 *              - designation
 *              - organizationId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ritu Rath
 *               email:
 *                 type: string
 *                 example: ritu@test.com
 *               phone:
 *                 type: string
 *                 example: "9999999999"
 *               designation:
 *                 type: string
 *                 example: Developer
 *               organizationId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Employee created successfully
 */
router.post(
  "/",
  authorizePermissions(["employee:create"]),
  employeeController.create,
);

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     tags:
 *       - Employees
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
 *         description: Employee found
 *       404:
 *         description: Employee not found
 */
router.get(
  "/:id",
  authorizePermissions(["employee:read"]),
  employeeController.getById,
);

/**
 * @swagger
 * /api/v1/employees:
 *   get:
 *     summary: Get all Employees
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of Employees
 */
router.get(
  "/",
  authorizePermissions(["employee:read"]),
  employeeController.getAll,
);

/**
 * @swagger
 * /api/v1/employees/organization/{organizationId}:
 *   get:
 *     summary: Get all employee under an organization
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: organizationId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Employee fettched successfully
 */
router.get(
  "/organization/:organizationId",
  authorizePermissions(["employee:read"]),
  employeeController.getAllByOrganization,
);

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   put:
 *     summary: Update employee detail
 *     tags:
 *       - Employees
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
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Name
 *               phone:
 *                 type: string
 *                 example: "9999999999"
 *               designation:
 *                 type: string
 *                 example: Senior Developer
 *     responses:
 *       201:
 *         description: Employee updated successfully
 */
router.put(
  "/:id",
  authorizePermissions(["employee:update"]),
  employeeController.update,
);

/**
 * @swagger
 * /api/v1/employees/{id}:
 *   delete:
 *     summary: Delete Employee by ID
 *     tags:
 *       - Employees
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
 *         description: Employee deleted successfully
 */
router.delete(
  "/:id",
  authorizePermissions(["employee:delete"]),
  employeeController.deleteById,
);

/**
 * @swagger
 * /api/v1/employees:
 *   delete:
 *     summary: Delete all Employees
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All employees deleted successfully
 */
router.delete(
  "/",
  authorizePermissions(["employee:delete"]),
  employeeController.deleteAll,
);

export default router;
