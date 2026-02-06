import { Request, Response, NextFunction } from "express";
import CONSTANTS from "../utils/constants";
import { on } from "node:cluster";

export function authorizePermissions(required: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userPermissions = (req as any).user?.permissions || [];

    const allowed = required.every((p) => userPermissions.includes(p));

    if (!allowed) {
      return res
        .status(CONSTANTS.HTTP_STATUS.FORBIDDEN)
        .json({ message: "Permission denied" });
    }
    next();
  };
}
