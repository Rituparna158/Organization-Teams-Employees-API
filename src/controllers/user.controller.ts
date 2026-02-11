import { Request, Response } from "express";
import CONSTANTS from "../utils/constants";
import userService from "../services/user.service";
import roleService from "../services/role.service";

const useController = {
  me(req: Request, res: Response) {
    res.status(CONSTANTS.HTTP_STATUS.OK).json((req as any).user);
  },
  async updateMe(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const { email } = req.body;
      const user = await userService.updateMe(userId, email);
      if (!user) {
        return res
          .status(CONSTANTS.HTTP_STATUS.NOT_FOUND)
          .json({ message: "User not found" });
      }
      res.status(CONSTANTS.HTTP_STATUS.OK).json(user);
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },

  async updatePassword(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const { newPassword } = req.body;

      const user = await userService.updatePassword(userId, newPassword);
      if (!user) {
        return res
          .status(CONSTANTS.HTTP_STATUS.BAD_REQUEST)
          .json({ message: "Password update failed" });
      }
      res.status(CONSTANTS.HTTP_STATUS.OK).json({
        message: "Password updated successfully!",
      });
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },

  async deleteMe(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const deleted = await userService.deleteMe(userId);

      if (!deleted) {
        return res
          .status(CONSTANTS.HTTP_STATUS.BAD_REQUEST)
          .json({ message: "User deletion failed" });
      }

      res.status(CONSTANTS.HTTP_STATUS.OK).json({
        message: "user deleted",
      });
    } catch {
      return res
        .status(CONSTANTS.HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INTERNAL_SERVER_ERROR });
    }
  },
  async assignRole(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const { role } = req.body;
    await roleService.assignRoleToUser(userId, role);
    res.json({ message: "Role assigned successfully" });
  },
};
export default useController;
