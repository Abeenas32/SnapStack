import bcrypt from "bcrypt";
import prisma from "../utils/prisma";
import { loginSchema, type LoginSchema } from "../utils/loginSchema";
import { generateAccessToken } from "../utils/jwt";
import { sendResponse } from "../utils/sendResponse";

export const loginUser = async (input: LoginSchema) => {
    const { email, password } = input;
    if (!email || !password) {
        console.log("Please provide the email or password");
        throw new Error(" Email or Password is required");
    }
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        throw new Error(" Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    if (!isPasswordValid) {
        throw new Error("Provide the valid password");
    }
    const token = generateAccessToken(user.id, user.email);
    const { hashedPassword: _, ...safeUser } = user;
    return { token, user: safeUser };
}
