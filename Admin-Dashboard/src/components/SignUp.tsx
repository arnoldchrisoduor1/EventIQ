import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import { User, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../redux/hooks/hooks";
import { signup } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import toast, { Toaster } from "react-hot-toast";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const SignUp: React.FC = () => {

  const { error, isLoading, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = dispatch(signup({ firstname, lastname, email, password }));
      console.log("Sign up response: ", response);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    if(isLoading) {
      toast.loading("Creating account...");
    }
    if(isAuthenticated) {
      toast.dismiss();
      toast.success("Sign up successful. Check your email for a verification code.");
      navigate("/verify-email");
    }
    if(error != null) {
      toast.dismiss();
      toast.error(error);
    }
  }, [isLoading, isAuthenticated, navigate, error]);

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
      <div className="inline-block border-2 blurry-white-card p-8">
        <div className="flex flex-col gap-4">
          <div>
            <h1 className="text-3xl font-semibold">Join Event<span className="text-customBlue">IQ</span></h1>
          </div>
          <div className="w-full">
            <form onSubmit={handleSignUp} className="flex flex-col gap-2 w-[350px] mx-auto">
              {/* Inputs are now connected to state */}
              <div className="flex">
              <InputComponent
                type="text"
                placeholder="First Name"
                Icon={User}
                value={firstname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                classwidth="placeholder-black/50"
              />

              <InputComponent
                type="text"
                placeholder="Last Name"
                Icon={User}
                value={lastname}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                classwidth="placeholder-black/50"
              />
              </div>
              <InputComponent
                type="text"
                placeholder="Email"
                Icon={Mail}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                classwidth="placeholder-black/50"
              />
              <InputComponent
                type="password"
                placeholder="Password"
                Icon={Lock}
                isPassword={true}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                classwidth="placeholder-black/50"
              />

              {/* { error && <p className="text-red-500 font-semibold mt-2">{error}</p> } */}
              <PasswordStrengthMeter password={password} />
              <div>
              <button
                type="submit"
                className="btn px-6 py-2 w-[60%] bg-customBlue/80 text-white rounded-md hover:bg-customBlue transition duration-custom mt-2"
              >
                Get Started
              </button>
              </div>
            </form>
          </div>
          <div>
            <p>
              Already have an account?{" "}
              <Link to="/login">
                <span className="text-customBlue hover:cursor-pointer">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
