import type { Request, Response } from "express";
import { loginUser } from "../services/login.service";
import { sendResponse } from "../utils/sendResponse";


export const loginUser_ = async (req:Request, res :Response) => {
    try {
        const  {email, password} = req.body;
         if (!email || !password) {
            console.log("Email and password are required");
             return sendResponse(res, { 
                success :false,
                message : "Email and password both are required",
                statusCode: 400
             });
         }
         const { token , user} = await loginUser({email, password});
         console.log("Logged in successfully");
         console.log(`userId : ${user.id}`);
         console.log(`email : ${user.email}`);
         return sendResponse(res, {
             success :true,
             message : "Login Successful",
             data : user,
         })
    } catch (error: any) {
        console.log("Unexpected error occured", error);
        return sendResponse(res, {
             success :false,
             message :error.message,
            error : error
        });
        
    }
}
