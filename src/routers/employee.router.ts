import { Router } from "express";
import employeeController from "../controllers/employee.controller";
import { authenticate } from "../middlewares/auth.middlewares";
import { authorizePermissions } from "../middlewares/authorizePermissions";

const router=Router();

router.use(authenticate);

router.post("/",authorizePermissions(["employee:create"]),employeeController.create);
router.get("/:id",authorizePermissions(["employee:read"]),employeeController.getById);
router.get("/",authorizePermissions(["employee:read"]),employeeController.getAll);
router.get("/organization/:organizationId",authorizePermissions(["employee:read"]),employeeController.getAllByOrganization);
router.put("/:id",authorizePermissions(["employee:update"]),employeeController.update);
router.delete("/:id",authorizePermissions(["employee:delete"]),employeeController.deleteById);
router.delete("/",authorizePermissions(["employee:delete"]),employeeController.deleteAll);

export default router;