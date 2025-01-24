import { Mail, User, MapPinHouse, Phone, X } from "lucide-react";
import InputComponent from "../InputComponent";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setEditProfileState } from "../../redux/slices/editProfileSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const UpdateInfoForm = () => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const dispatch = useAppDispatch();

    const { editState } = useSelector((state: RootState) => state.editProf);

    const handleCloseUpdateProfileForm = () => {
        dispatch(setEditProfileState(!editState));
    }

  return (
    <div className="bg-white p-7 rounded-2xl relative">
        <div className="absolute right-5 text-black/50 hover:text-customBlue/50 cursor-pointer transition duration-custom"
        
        onClick={handleCloseUpdateProfileForm}>
            <X />
        </div>
        <h1 className="gray-header text-center">Update Your Profile</h1>
        <form className="flex flex-col w-[350px] mx-auto">
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
                type="text"
                placeholder="Address"
                Icon={MapPinHouse}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                classwidth="placeholder-black/50"
              />
              <InputComponent
                type="text"
                placeholder="Phone Number"
                Icon={Phone}
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                classwidth="placeholder-black/50"
              />
              <button className="btn-primary w-[80%] mx-auto my-5">Update</button>
        </form>
    </div>
  )
}

export default UpdateInfoForm;