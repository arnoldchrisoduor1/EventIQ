import crypto from "crypto";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.model";
import { Request, Response } from "express";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";

export const signup = async(req: Request, res: Response) => {
    const { email, password, firstname, lastname } = req.body;
    try {
        if(!email || !password || !firstname || !lastname) {
            throw new Error('All fields are required');
        }

        const userAlreadyExists = await User.findOne({ email });

        if (userAlreadyExists) {
            return res.status(400).json({ success:false, message: "User with this email already exists" });
        }

        // Hashing the password.
        const hashedPassword = await bcryptjs.hash(password, 10);

        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            firstname,
            lastname,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours.
        })

        await user.save();

        // jwt
        generateTokenAndSetCookie(res, user._id);

        // sending the verification email
        
        res.status(201).json({
            success: true,
            message: "Account Created Successfully",
            user: {
                ...user._doc,
                password: undefined
            }
        })
        console.log("Sign up successful");
    } catch(error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
}