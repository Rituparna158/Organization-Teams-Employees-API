import { Router } from "express";
import useController from "../controllers/user.controller";
import { authenticate } from "../middlewares/auth.middlewares";

const router=Router();

router.use(authenticate);

router.get("/me",useController.me);
export default router;
