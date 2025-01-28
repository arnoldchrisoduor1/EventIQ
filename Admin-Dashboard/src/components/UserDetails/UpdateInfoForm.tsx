import { Mail, User, MapPinHouse, Phone, X, BriefcaseBusiness } from "lucide-react";
import InputComponent from "../InputComponent";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux/hooks/hooks";
import { setEditProfileState } from "../../redux/slices/editProfileSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import ProfilePhotoUpload from "./profilePhotoUpload";
import toast, { Toaster } from "react-hot-toast";
import { updateprofile } from "../../redux/slices/authSlice";

const UpdateInfoForm = () => {

    const dispatch = useAppDispatch();
    const { editState } = useSelector((state: RootState) => state.editProf);
    const { user, isLoading, error } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        address: user.address,
        mobilenumber: user.mobilenumber,
        profilePhoto: '',
        occupation: user.occupation
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfilePhotoChange = (photoUrl: any) => {
        setFormData(prev => ({
            ...prev,
            profilePhoto: photoUrl
        }));
    };

    const handleCloseUpdateProfileForm = () => {
        dispatch(setEditProfileState(!editState));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Add your update profile logic here
        await dispatch(updateprofile(formData));
        console.log('Updating profile with:', formData);
    };

    useEffect(() => {
        if(isLoading) {
            toast.loading("Updating profile...");
        }

        if(error) {
            toast.dismiss();
            toast.error("Error. Try again later");
        }

        if(!error) {
            toast.dismiss();
            toast.success("Profile Updated successfully");
        }
    }, [error, isLoading])

    return (
        <>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="bg-white p-7 rounded-2xl relative">
            <div 
                className="absolute right-5 text-black/50 hover:text-customBlue/50 cursor-pointer transition duration-custom"
                onClick={handleCloseUpdateProfileForm}
            >
                <X />
            </div>

            <h1 className="gray-header text-center">Update Your Profile</h1>

            
            <div className="flex justify-center mb-4">
                <ProfilePhotoUpload 
                    profilePhoto={formData.profilePhoto || user.profileImage}
                    onPhotoChange={handleProfilePhotoChange}
                />
            </div>
                        
            <form onSubmit={handleSubmit} className="flex flex-col w-[350px] mx-auto">
                <div className="flex space-x-2">
                    <InputComponent
                        type="text"
                        name="firstname"
                        placeholder="First Name"
                        Icon={User}
                        value={formData.firstname}
                        onChange={handleInputChange}
                        classwidth="placeholder-black/50"
                    />
                    <InputComponent
                        type="text"
                        name="lastname"
                        placeholder="Last Name"
                        Icon={User}
                        value={formData.lastname}
                        onChange={handleInputChange}
                        classwidth="placeholder-black/50"
                    />
                </div>
                
                <InputComponent
                    type="email"
                    name="email"
                    placeholder="Email"
                    Icon={Mail}
                    value={formData.email}
                    onChange={handleInputChange}
                    classwidth="placeholder-black/50"
                />
                
                <InputComponent
                    type="text"
                    name="address"
                    placeholder="Address"
                    Icon={MapPinHouse}
                    value={formData.address}
                    onChange={handleInputChange}
                    classwidth="placeholder-black/50"
                />
                
                <InputComponent
                    type="tel"
                    name="mobilenumber"
                    placeholder="Phone Number"
                    Icon={Phone}
                    value={formData.mobilenumber}
                    onChange={handleInputChange}
                    classwidth="placeholder-black/50"
                />

                <InputComponent
                    type="tel"
                    name="occupation"
                    placeholder="Occupation"
                    Icon={BriefcaseBusiness}
                    value={formData.occupation}
                    onChange={handleInputChange}
                    classwidth="placeholder-black/50"
                />
                
                <button type="submit" className="btn-primary w-[80%] mx-auto my-5">
                    Update
                </button>
            </form>
        </div>
        </>
    );
};

export default UpdateInfoForm;