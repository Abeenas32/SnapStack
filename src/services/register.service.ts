import bcrypt from "bcrypt";
import prisma from "../utils/prisma";
import type { RegisterSchema } from "../utils/registerSchema";
import sanitize from "sanitize-html";

export const registerUser = async (input: RegisterSchema) => {
    try {
        const firstName = sanitize(input.firstName);
        const lastName = sanitize(input.lastName);
        const email = sanitize(input.email);
        const password = sanitize(input.password);
        const hashedPassword_ =await bcrypt.hash(password,10);
        const checkExistingUser = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
        if (checkExistingUser) {
            throw new Error("User with this email alreay exist, Please try another one");
        }

        const user = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                hashedPassword: hashedPassword_,
            }
        });
        const { hashedPassword :_, ...safeUser } = user;
        return safeUser;
    } catch (error: any) {
        throw new Error(`Error occured in registering the user :${error.message}`);
    }

}
