import { useState } from "react";
import InputComponent from "./InputComponent";
import { User } from "lucide-react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../redux/hooks/hooks";
import { signup } from "../redux/slices/authSlice";

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(signup({ name, email, password }));
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
    <div className="inline-block border-2 bg-white px-4 py-10 w-[50%] mx-auto rounded-lg">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Join EventIQ</h1>
        </div>
        <div className="w-full">
          <form onSubmit={handleSignUp} className="flex flex-col gap-2 w-[350px] mx-auto">
            {/* Inputs are now connected to state */}
            <InputComponent
              type="text"
              placeholder="First Name"
              Icon={User}
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            />
            <InputComponent
              type="text"
              placeholder="Email"
              Icon={User}
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
            <InputComponent
              type="password"
              placeholder="Password"
              Icon={User}
              isPassword={true}
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
            <div>
            <button
              type="submit"
              className="btn px-6 py-2 border bg-customBlue/80 text-white rounded-md hover:bg-customBlue transition duration-custom"
            >
              Get Started
            </button>
            </div>
          </form>
        </div>
        <div>
          <p>
            Already have an account?{" "}
            <span className="text-customBlue hover:cursor-pointer">Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
