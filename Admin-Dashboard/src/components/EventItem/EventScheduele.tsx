import defaultImage from "../../assets/img/logo.png";

const EventScheduele = ({name, time, title, description, image}) => {
  return (
    <div className="mt-5 hover:cursor-pointer">
      <div className="flex justify-between items-center border hover:border-black/50 transition duration-custom p-4">
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
          <p className="text-md mt-1">{name}</p>
        </div>
        <div className="text-start">
          <h3 className="font-semibold text-xl">{title}</h3>
          <p className="text-black/50">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventScheduele;
