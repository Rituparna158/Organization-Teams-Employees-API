import { Router } from "express";
import organizationController from "../controllers/organization.controller";
import { authenticate } from "../middlewares/auth.middlewares";
import { authorizePermissions } from "../middlewares/authorizePermissions";

const router=Router();
router.use(authenticate)

router.post("/",authorizePermissions(["organization:create"]),organizationController.create);
router.get("/",authorizePermissions(["organization:read"]),organizationController.getAll);
router.get("/:id",authorizePermissions(["organization:read"]),organizationController.getById);
router.put('/:id',authorizePermissions(["organization:update"]),organizationController.update);
router.delete("/",authorizePermissions(["organization:delete"]),organizationController.deleteAll);
router.delete('/:id',authorizePermissions(["organization:delete"]),organizationController.deleteById);
export default router;