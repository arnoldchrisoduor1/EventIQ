import crypto from "crypto";
import bcryptjs from "bcryptjs";
import { User } from "../models/user.model";
import { Request, Response } from "express";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail } from '../emails/emailService';
import { EmailVerificationRequest, ForgotPasswordRequest, LoginRequest, ResetPasswordRequest, UserRequest } from "../types/types";

export const signup = async (
    req: Request<{}, {}, UserRequest>,
    res: Response
): Promise<void> => {
    const { email, password, firstname, lastname } = req.body;
    
    try {
        if (!email || !password || !firstname || !lastname) {
            console.log("Signup Error - not all details were provided");
            throw new Error('All fields are required');
        }

        const userAlreadyExists = await User.findOne({ email });

        if (userAlreadyExists) {
            res.status(400).json({ 
                success: false, 
                message: "User with this email already exists" 
            });
            console.log("Signup Error - User with this email already exists");
            return;
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            firstname,
            lastname,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
        });

        await user.save();

        generateTokenAndSetCookie(res, user._id.toString());
        await sendVerificationEmail(user.email, verificationToken);

        const userObject = user.toObject();
        delete (userObject as any).password;

        res.status(201).json({
            success: true,
            message: "Account Created Successfully",
            user: userObject
        });
        console.log("Sign up successful");
    } catch (error: any) {
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};


// EMAIL VERIFICATION LOGIC.
export const verifyEmail = async (
    req: Request<{}, {}, EmailVerificationRequest>,
    res: Response
): Promise<void> => {
    const { code } = req.body;

    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now() }
        });

        if (!user) {
            res.status(400).json({ 
                success: false, 
                message: "Invalid or expired verification code" 
            });
            return;
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email);

        const userObject = user.toObject();
        delete (userObject as any).password;

        res.status(200).json({
            success: true,
            message: "Email verified successfully",
            user: userObject
        });

        console.log("Email verified");
    } catch (error) {
        console.log("Error in verifyEmail", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error" 
        });
    }
};

// =============== Login Logic ====================
export const login = async (req: Request<{}, {}, LoginRequest>, res: Response) : Promise<void> => {
    const { email, password } = req.body;

    try {
        const user =await User.findOne({ email });
        if(!user) {
            res.status(400).json({ success: false, message: "Invalid credentials" });
            return;
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if(!isPasswordValid) {
            res.status(400).json({ success: false, message: "Invalid credentials" });
            return;
        }

        generateTokenAndSetCookie(res, user._id.toString());

        user.lastLogin = new Date();
        await user.save();

        const userObject = user.toObject();
        delete (userObject as any).password;

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: userObject
        });
    } catch (error: any) {
        console.log("Error in login", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

// ================== Logout Logic ================
export const logout = async(req: Request, res: Response) => {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
    console.log("Logout successfull");
}

// Forgot Password Logic
export const forgotPassword = async (req: Request<{}, {}, ForgotPasswordRequest>, res: Response): Promise<void> => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            res.status(400).json({ success: false, message: "User not found" });
            return
        }

        // generating reset token.
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000) // 1 hour.

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        //send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);

        res.status(200).json({ success: true, message: "Password reset link sent to your email" });
    } catch (error: any) {
        console.log("Error in forgotPassword", error);
        res.status(400).json({ success: false, mesage: error.message });
    }
}

export const resetPassword = async (req: Request<{token: string}, {}, ResetPasswordRequest>, res: Response): Promise<void> => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: { $gt: Date.now()},
        });

        if(!user) {
            res.status(400).json({ success: false, message: "Invalid or expired reset token" });
            return;
        }

        // update password
        const hashedPassword = await bcryptjs.hash(password, 10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiresAt = undefined;
        await user.save();

        await sendResetSuccessEmail(user.email);

        res.status(200).json({ success: true, message: "Password reset successful" });
    } catch (error: any) {
        console.log("Error in resetPassword", error);
        res.status(400).json({ success: false, message: error.message });
    }
}

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user) {
            res.status(400).json({ success: false, message: "User not found" });
            return;
        }

        res.status(200).json({ success: true, user});

    } catch (error: any) {
        console.log("Error in checkAuth", error);
        res.status(400).json({ success:false, message: error.message });
    }
}