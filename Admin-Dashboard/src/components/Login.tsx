import { useState } from "react";
import InputComponent from "./InputComponent";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../redux/hooks/hooks";
import { login } from "../redux/slices/authSlice";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(login({ email, password }));
      navigate("/");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="inline-block border-2 bg-white bg-opacity-60 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl p-8">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Welcome Back</h1>
        </div>
        <div className="w-full">
          <form onSubmit={handleSignUp} className="flex flex-col gap-2 w-[350px] mx-auto">
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
  );
};

export default Login;
