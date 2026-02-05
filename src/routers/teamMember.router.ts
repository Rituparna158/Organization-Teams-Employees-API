import { Router } from "express";
import { authenticate } from "../middlewares/auth.middlewares";
import teamMemberController from "../controllers/teamMember.controller";
import { authorizePermissions } from "../middlewares/authorizePermissions";

const router = Router();
router.use(authenticate);
router.post(
  "/:teamId/members",
  authorizePermissions(["team:manage-members"]),
  teamMemberController.create,
);
router.get(
  "/:teamId/members",
  authorizePermissions(["team:read"]),
  teamMemberController.getMembers,
);

export default router;
