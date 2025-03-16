import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-common/config";

declare module "express"{
    interface Request{
        userId?:string
    }
}

export function Middleware(req:Request,res:Response,next:NextFunction){
    const token=req.headers.authorization;
    if(!token){
        res.json({
            message:"token does not exist "
        })
        return;
    }

    const decode = jwt.verify(token, JWT_SECRET) as { userId: string };
    if(decode && decode.userId){
        req.userId=decode.userId as string;  
        next();
    }else{
        res.status(403).json({
            message:"Unauthorized"
        })
    }
}
