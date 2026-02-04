import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares";
import teamMemberController from "../controllers/teamMember.controller";

const router=Router();
router.use(authenticate);
router.post("/:teamId/members",teamMemberController.create);
router.get("/:teamId/members",teamMemberController.getMembers);

export default router;