import { Request,Response } from "express";
import CONSTANTS from "../utils/constants";

const useController={
    me(req:Request,res:Response){
        res.status(CONSTANTS.HTTP_STATUS.OK)
        .json((req as any).user)
    }
};
export default useController;