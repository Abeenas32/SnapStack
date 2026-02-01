import type { ResposnseData } from "../types/type";
import  type { Response} from "express";

export const sendResponse = (res : Response ,data : ResposnseData) => {
    const statuscode = data.statusCode ||  (data.success ? 200 : 400);
    const response : any = {
        success : data.success,
        message : data.message,
    }
     if (data?.data === !undefined) { 
        response.data = data.data;
     }  
      if (data.error !== undefined) {
        response.error = data.error;
      }

     return res.status(statuscode).json(response);
}
