import { Request,Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userService from "../services/user.service";
import CONSTANTS from "../utils/constants";
import { register } from "node:module";

const JWT_CODE="secret";

const authController={
    async register(req:Request,res:Response){
        const {email,password,role}=req.body;
        const user=await userService.register(email,password,role ?? "user");

        res.status(CONSTANTS.HTTP_STATUS.CREATED)
        .json({message:CONSTANTS.AUTH_MESSAGES.USER_CREATED,user})
    },
    async login(req:Request,res:Response){
        const {email,password}=req.body;
        const user=await userService.findByEmail(email);
        if(!user){
            return res.status(CONSTANTS.HTTP_STATUS.UNAUTHORIZED)
            .json({message:CONSTANTS.AUTH_MESSAGES.INVALID_CREDENTIALS})
        }

    const isMatch= await bcrypt.compare(
        password,
        user.passwordHash
        
    );
    if(!isMatch){
        return res.status(CONSTANTS.HTTP_STATUS.UNAUTHORIZED)
        .json({message:CONSTANTS.AUTH_MESSAGES.INVALID_CREDENTIALS});
    }
    const token=jwt.sign(
        {
            userId:user.id,
            role:user.role
        },
        JWT_CODE,
        {expiresIn:"1h"}
    );
    res.status(CONSTANTS.HTTP_STATUS.OK)
    .json({message:CONSTANTS.AUTH_MESSAGES.LOGIN_SUCCESS, accessToken: token})
}

}
export default authController;