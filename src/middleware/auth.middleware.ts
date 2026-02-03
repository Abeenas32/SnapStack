import type {Request, Response, NextFunction }  from "express";
import { sendResponse } from "../utils/sendResponse"; 
import  jwt  from "jsonwebtoken";
import { send } from "process";



interface JwtPayload {
     userId :String,
     email : String,
}
declare global {
    namespace Express {
      interface Request {
        user?: JwtPayload;
      }
    }
  }

export const authenticate = async (req: Request, res : Response, next:NextFunction) : Promise<void> => {
 const authHeader  = req.headers.authorization;
   if(!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Token is required");
     sendResponse(res, { 
        success :false,
        message : "Ioken is required",
        statusCode : 401
     });
     return ;
   }
   const token = authHeader.split(" ")[1];
   if(!token) {
    console.log("Invlaid token provided");
     sendResponse(res, {
         success :false,
         message : "Invalid token  provieded",
         statusCode:401
     });
     return ;
   }
   try {
    const accessSecret = process.env.ACCESSTOKEN_SECRET;
    if(!accessSecret) {
        console.log("Access secret is required");
         throw new Error("Access secret is required");
        } 
      const decoded = jwt.verify(token, accessSecret) as JwtPayload;
      if(!decoded.userId || !decoded.email) {
        console.log("Invlaid paylod provided");
         sendResponse(res, {
             success : false,
             message : "Invalid payload  provided",
             statusCode: 401,
         });
         return ;
      }
      req.user = decoded;
      console.log("Authenticated Successfully");
      console.log(`UserId:${decoded.userId}`);
      console.log(`Email:${decoded.email}`);
      next();

   } catch (error: any) {
    console.log("Error message is ",error.message);
      sendResponse(res, {
         success :false,
         message : error.message,
         statusCode: 500,
         error : error
      });

    
   }
}
