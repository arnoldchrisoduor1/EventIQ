import { Menu } from "lucide-react";
import defaultImage from "../../assets/img/logo.png";

const EventScheduele = ({name, time, title, description, image}) => {
  return (
    <div className="mt-5 hover:cursor-pointer">
      <div className="grid grid-cols-4 border hover:border-black/50 transition duration-custom p-4">
        {/* <div>
          <Menu />    
        </div> */}
        <div className="w-10 h-10 rounded-full overflow-hidden">
          <img
            src={image || defaultImage}
            alt="Speaker"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <p className="text-sm text-gray-600">{time}</p>
        </div>
        <div>
          <p className="text-md mt-1 truncate">{name}</p>
        </div>
        <div className="text-start">
          <h3 className="font-semibold text-xl">{title}</h3>
          <p className="text-black/50 truncate">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventScheduele;
