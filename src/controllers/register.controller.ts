import type { Request, Response } from "express";
import { registerUser } from "../services/register.service";
import { generateAccessToken } from "../utils/jwt";
import { sendResponse } from "../utils/sendResponse";
import prisma from "../utils/prisma";

export const registeruser = async (req: Request, res: Response) => {
  try {
    const user = await registerUser(req.body);

    if (!user) {
      // User creation failed
      return sendResponse(res, {
        success: false,
        message: "User not registered, invalid data",
        data: req.body,
        statusCode: 400
      });
    }

    //  Success: create token and send response
    const { id: userId, email } = user; 
    // Use actual user object returned by Prisma
    const token = generateAccessToken(userId, email);

    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1 * 24 * 60 * 60 * 1000
    });
    console.log("User registered successfully");
    console.log(`userId : ${userId}`);
    console.log(`email : ${email}`)

    return sendResponse(res, {
      success: true,
      message: "User registered successfully",
      data: user,
      statusCode: 200
    });

  } catch (error: any) {
    //  Important: log full error
    console.error("REGISTER ERROR ", error);

    return sendResponse(res, {
      success: false,
      message: error instanceof Error ? error.message : "Internal server error",
      error: error instanceof Error ? { name: error.name, stack: error.stack } : error,
      statusCode: 500
    });
  }
};
