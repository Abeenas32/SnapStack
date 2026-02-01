import z from "zod";
export const registerSchema = z.object({
    firstName: z.string().min(3, "First name must be at least 3 characters long").trim(),
    lastName: z.string().min(3, "Last name must be at least 3 characters long").trim(),
    email: z.string().email().trim().toLowerCase(),
    password: z.string().min(6, "Your password must be 6 character long").regex(/(?=.*[a-z])/, "Password must contain at least 1 lowercase letter")
        .regex(/(?=.*[A-Z])/, "Password must contain at least 1 uppercase letter")
        .regex(/(?=.*\d)/, "Password must contain at least 1 number")
        .regex(
            /(?=.*[!@#$%^&*(),.?":{}|<>_\-\/\\])/,
            "Password must contain at least 1 special character"
        ),
}).strict();

export type RegisterSchema = z.infer<typeof registerSchema>;