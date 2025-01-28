import { motion } from "framer-motion"
import { useState } from "react";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import InputComponent from "./InputComponent";
import { useAppDispatch } from "../redux/hooks/hooks";
import { forgotPassword } from "../redux/slices/authSlice";

const ForgotPassword = () => {

    const { isLoading } = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);


    const handleSubmit = async(e) => {
        e.preventDefault();
        await dispatch(forgotPassword({email}));
        setIsSubmitted(true);
    }

  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full blurry-white-card overflow-hidden mx-auto"
    >
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r text-black/50 bg-clip-text">
                Forgot Password
            </h2>
            {!isSubmitted ? (
                <form onSubmit={handleSubmit}>
                    <p className=" mb-6 text-center">Enter your email address and we'll send you a link to reset your password</p>
                    <InputComponent
                        Icon={Mail}
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        classwidth="placeholder-black/50"
                    />
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 text-white font-bold rounded-lg shadow-lg  focus:outline-none focus:ring-2 bg-customBlue/70 hover:bg-customBlue focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
                    >
                        {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : "Send Reset Link"}
                    </motion.button>
                </form>
            ) : (
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        className="w-16 h-16 bg-customBlue rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <Mail className="h-8 w-8 text-white" />
                    </motion.div>
                    <p className="text-gray-300 mb-6">
                        If an account exists for { email }, you will receive a password reset link shortly.
                    </p>
                </div>
            )}
        </div>

        <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
            <Link to={"/login"} className="text-sm text-customBlue hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2"/> Back to Login
            </Link>
        </div>

    </motion.div>
  )
}

export default ForgotPassword