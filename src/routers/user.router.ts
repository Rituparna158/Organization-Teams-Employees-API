import { Router } from "express";
import useController from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middlewares";
import { authorizePermissions } from "../middlewares/authorizePermissions";

const router=Router();

router.use(authenticate);

router.get("/me",useController.me);
router.put("/me",useController.updateMe);
router.patch("/me/password",useController.updatePassword);
router.delete("/me",useController.deleteMe)
router.post("/:id/roles",authorizePermissions(["user:assign-role"]),useController.assignRole);
export default router;
