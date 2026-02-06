import { Request, Response } from "express";
//import jwt from "jsonwebtoken";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userService from "../services/user";
import roleService from "../services/role";
import permissionService from "../services/permission";
import CONSTANTS from "../utils/constants";
import { register } from "node:module";

const jwtCode = process.env.jwt_code as string;
const jwtExpiresIn = process.env.jwt_expires_in || "1h";

if (!jwtCode || !jwtExpiresIn) {
  throw new Error("jwt env variable not load");
}

const authController = {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userService.register(email, password);

    res
      .status(CONSTANTS.HTTP_STATUS.CREATED)
      .json({ message: CONSTANTS.AUTH_MESSAGES.USER_CREATED, user });
  },
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);
    if (!user) {
      return res
        .status(CONSTANTS.HTTP_STATUS.UNAUTHORIZED)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INVALID_CREDENTIALS });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res
        .status(CONSTANTS.HTTP_STATUS.UNAUTHORIZED)
        .json({ message: CONSTANTS.AUTH_MESSAGES.INVALID_CREDENTIALS });
    }
    const roles = await roleService.getRoleByUser(user.id);

    const permissions = await permissionService.getPermissionByRoles(roles);
    const token = jwt.sign(
      {
        userId: user.id,
        roles,
        permissions,
      },
      jwtCode,
      { expiresIn: "1h" },
    );
    res
      .status(CONSTANTS.HTTP_STATUS.OK)
      .json({
        message: CONSTANTS.AUTH_MESSAGES.LOGIN_SUCCESS,
        accessToken: token,
      });
  },
  async logout(req: Request, res: Response) {
    return res.json({ message: CONSTANTS.AUTH_MESSAGES.LOGOUT_SUCCESS });
  },
};
export default authController;
