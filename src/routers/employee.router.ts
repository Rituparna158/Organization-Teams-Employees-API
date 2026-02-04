import { Router } from "express";
import employeeController from "../controllers/employee.controller";
import { authenticate } from "../middlewares/auth.middlewares";

const router=Router();

router.use(authenticate);

router.post("/",employeeController.create);
router.get("/:id",employeeController.getById);
router.get("/",employeeController.getAll);
router.get("/organization/:organizationId",employeeController.getAllByOrganization);
router.put("/:id",employeeController.update);
router.delete("/:id",employeeController.deleteById);
router.delete("/",employeeController.deleteAll);

export default router;