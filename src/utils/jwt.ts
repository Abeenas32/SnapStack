import jwt, { type JwtPayload } from "jsonwebtoken";


const accessToken = process.env.ACCESSTOKEN_SECRET;
if (!accessToken) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
}

export const generateAccessToken = (userId: string, email: string) => {
    return jwt.sign({ userId, email }, accessToken!, { algorithm: "HS256", expiresIn: "15m" });
}

export const verifyAccessToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, accessToken!) as JwtPayload;
        return decoded;
    } catch (error: any) {
        console.log("token verification faile ", error.message);
        return null;
    }
}
