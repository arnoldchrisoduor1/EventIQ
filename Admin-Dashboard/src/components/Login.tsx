import { useEffect, useState } from "react";
import InputComponent from "./InputComponent";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../redux/hooks/hooks";
import { login } from "../redux/slices/authSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import toast, { Toaster } from "react-hot-toast";

const Login: React.FC = () => {

  const { isLoading, error, isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        console.log("Login successful", resultAction.payload);
      } else {
        console.error("Login failed", resultAction);
      }
    } catch (error) {
      console.error("Login error", error);
    }
  };

  useEffect(() => {
    if(isLoading) {
      toast.loading("Authenticating...")
    }
    if(isAuthenticated) {
      toast.dismiss();
      toast.success('Logged In!')
      navigate("/");
      console.log("User3", user);
    }
    if(error != null) {
      toast.dismiss();
      toast.error(error);
    }
  }, [error, isLoading, isAuthenticated, navigate, user]);

  return (
    <>
    <Toaster position="top-right" reverseOrder={false} />
    <div className="inline-block border-2 blurry-white-card p-8">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
        </div>
        <div className="w-full">
          <form onSubmit={handleLogin} className="flex flex-col gap-2 w-[350px] mx-auto">
            {/* Inputs are now connected to state */}
            
            <InputComponent
              type="text"
              placeholder="Email"
              Icon={User}
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              classwidth="placeholder-black/50"
            />
            <InputComponent
              type="password"
              placeholder="Password"
              Icon={User}
              isPassword={true}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              classwidth="placeholder-black/50"
            />
            <p className="text-start ml-2">Forgot password ? <Link to="/forgot-password" className="text-customBlue">Reset Now</Link></p>
            <div>
            <button
              type="submit"
              className="btn px-6 w-[60%] py-2 bg-customBlue/80 text-white rounded-md hover:bg-customBlue transition duration-custom"
            >
              Sign In
            </button>
            </div>
          </form>
        </div>
        <div>
          <p>
            Don't have an account?{" "}
            <Link to="/signup"><span className="text-customBlue hover:cursor-pointer">Join Now</span></Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
