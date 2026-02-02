import { ZodType, ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";
import { sendResponse } from "../utils/sendResponse";

export const validate = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req.body);
      req.body = parsed;
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return sendResponse(res, {
          success: false,
          message: "Validation error",
          error: error,
          statusCode: 400,
        });
      }

      return sendResponse(res, {
        success: false,
        message: "Internal validation error",
        statusCode: 500,
      });
    }
  };
};
