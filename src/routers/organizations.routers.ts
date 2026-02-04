import { Router } from "express";
import organizationController from "../controllers/organization.controller";
import { authenticate } from "../middlewares/auth.middlewares";

const router=Router();
router.use(authenticate)

router.post("/",organizationController.create);
router.get("/",organizationController.getAll);
router.get("/:id",organizationController.getById);
router.put('/:id',organizationController.update);
router.delete("/",organizationController.deleteAll);
router.delete('/:id',organizationController.deleteById);
export default router;