import express, {Request, Response} from "express"
import { checkAuth, forgotPassword, login, logout, resetPassword, signup, updateProfile, verifyEmail } from "../controllers/auth.controller";
import { verifyToken } from "../middleware/verifyToken";
import { getImgUrl } from "../utils/awsConfig";

const router = express.Router();

router.get("/check-auth", verifyToken, checkAuth);

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put('/update-profile', verifyToken, updateProfile);

router.get("/image-url", getImgUrl);

router.post("/verify-email",verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

export default router;