import { useState } from "react";
import InputComponent from "./InputComponent";
import { User, Mail, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "../redux/hooks/hooks";
import { signup } from "../redux/slices/authSlice";

const SignUp: React.FC = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      dispatch(signup({ firstname, lastname, email, password }));
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return (
      <div className="inline-block border-2 bg-white bg-opacity-60 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl p-8">
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
              <div>
              <button
                type="submit"
                className="btn px-6 py-2 w-[60%] bg-customBlue/80 text-white rounded-md hover:bg-customBlue transition duration-custom"
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
  );
};

export default SignUp;
