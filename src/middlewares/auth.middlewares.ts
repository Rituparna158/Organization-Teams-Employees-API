import { Request,Response,NextFunction, } from "express";
import jwt from "jsonwebtoken";
import CONSTANTS from "../utils/constants";

const JWT_CODE="secret";

export function authenticate(
    req:Request,
    res:Response,
    next:NextFunction
){
    const header = req.headers.authorization;

    if(!header || !header.startsWith("Bearer ")){
        return res.status(CONSTANTS.HTTP_STATUS.UNAUTHORIZED)
        .json({
            message: CONSTANTS.AUTH_MESSAGES.TOKEN_MISSING
        })
    }
    const token=header.split(" ")[1];
    try{
        const payload=jwt.verify(token,JWT_CODE);
        (req as any).user=payload;
        next();
    }catch{
        return res.status(CONSTANTS.HTTP_STATUS.UNAUTHORIZED)
        .json({
            message:CONSTANTS.AUTH_MESSAGES.TOKEN_INVALID
        });
    }
}