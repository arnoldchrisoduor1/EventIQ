import jwt from "jsonwebtoken";
import { Response } from "express";

export const generateTokenAndSetCookie = (res: Response, userId: string) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT secret not defined in environment variables");
    }
    const token = jwt.sign({ userId }, jwtSecret, {
        expiresIn: "7d",
    });

    res.cookie("token", token, {
        httpOnly: true, // Prevents XSS attacks
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration in milliseconds
    });

    return token;
};
