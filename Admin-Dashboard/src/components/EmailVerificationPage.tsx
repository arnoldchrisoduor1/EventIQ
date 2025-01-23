import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { verifyEmail } from "../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";

const EmailVerificationPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading, error, isVerified, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      const lastFilledIndex = newCode.reduce((lastIndex, digit, index) => digit !== "" ? index : lastIndex, -1);
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex]?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement> | Event) => {
    if (e) e.preventDefault();
    
    const verificationCode = code.join("");
    
    if (verificationCode.length === 6) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await dispatch(verifyEmail({ code: verificationCode }) as any);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    let toastId: string | null = null;

    if (isLoading) {
      toastId = toast.loading("Verifying Email...");
    }

    if (isVerified) {
      if (toastId) toast.dismiss(toastId);
      toast.success("Email Verified");
    }

    if(isVerified) {
      navigate("/");
    }

    if (error) {
      if (toastId) toast.dismiss(toastId);
      toast.error(error);
    }

    return () => {
      if (toastId) toast.dismiss(toastId);
    };
  }, [isAuthenticated, isLoading, isVerified, navigate, error]);

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit();
    }
  }, [code]);

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="max-w-md w-full white bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden m-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-6 text-center bg-customBlue text-transparent bg-clip-text">
            Verify Email
          </h2>
          <p className="text-center mb-6">
            Enter the 6-digit code sent to your email address.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-2xl font-bold bg-gray-400 text-customBlue border-2 border-gray-600 rounded-lg focus:border-customBlue focus:outline-none"
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-customBlue text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-customBlue hover:to-customBlue focus:outline-none focus:ring-2 focus:ring-customBlue focus:ring-opacity-50 disabled:opacity-50"
            >
              Verify Email
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default EmailVerificationPage;