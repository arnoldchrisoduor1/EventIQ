import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const token = req.cookies.token;
    
    if (!token) {
        res.status(401).json({ 
            success: false, 
            message: "Unauthorized - no token provided" 
        });
        return;
    }

    try {
        const decoded = jwt.verify(
            token, 
            process.env.JWT_SECRET as string
        ) as { userId: string };

        if (!decoded) {
            res.status(401).json({ 
                success: false, 
                message: "Unauthorized - invalid token" 
            });
            return;
        }

        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("Error in verifyToken", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
};