import { LucideProps } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface InputComponentTypes {
  type: string;
  placeholder: string;
  classwidth?: string;
  Icon: React.ComponentType<LucideProps>;
  isPassword?: boolean;
  value: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputComponent: React.FC<InputComponentTypes> = ({
  type,
  placeholder,
  classwidth,
  Icon,
  isPassword,
  value,
  onChange,
  name
}) => {
  const [hide, setHide] = useState(isPassword || false);

  return (
    <div className="inline-block">
      <div className="flex items-center gap-3 m-2 border border-slate-500 p-2 rounded-lg">
        {/* Leading Icon */}
        <div className="text-slate-500">
          <Icon />
        </div>
        {/* Input Field */}
        <div className="flex-grow">
          <input
            type={isPassword ? (hide ? "password" : "text") : type}
            placeholder={placeholder}
            className={twMerge(`bg-transparent outline-none w-full`, classwidth)}
            value={value}
            onChange={onChange}
            name={name}
          />
        </div>
        {/* Password Toggle */}
        {isPassword && (
          <div
            className="text-slate-600 cursor-pointer"
            onClick={() => setHide(!hide)}
          >
            {hide ? <EyeOff /> : <Eye />}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputComponent;
