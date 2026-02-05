import { Router } from "express";
import teamController from "../controllers/teams.contoller";
import { authenticate } from "../middlewares/auth.middlewares";
//import organizationController from "../controllers/organization.controller";

const router=Router();
router.use(authenticate)

router.post("/",teamController.create)
router.get("/:id",teamController.getById)
router.get("/",teamController.getAll)

router.get("/organization/:orgId",teamController.getOrganizationId);
router.put("/:id",teamController.update);
router.delete("/:id",teamController.deleteById);
router.delete("/",teamController.deleteAll)

export default router;