import EventWidgets from '../components/UserDetails/EventWidgets';
import PersonalInfoCard from '../components/UserDetails/PersonalInfoCard';
import UpdateInfoForm from '../components/UserDetails/UpdateInfoForm';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const UserDetailsPage = () => {

  const { editState } = useSelector((state: RootState) => state.editProf);

  return (
    <>
    <div className='h-screen bg-gray-600 bg-inherit w-[98%]'>
      <div className={`absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm ${editState ? 'block' : 'hidden'}`} />
        <div className='mx-auto mt-10'>
            <PersonalInfoCard />
        </div>
        <div className='mt-10'>
          <p className='gray-header'>Stats Widgets</p>
          <EventWidgets />
        </div>

        <div className='mt-10'>
        <p className='gray-header'>Social Widgets</p>
        </div>

        <div className={`absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] ${editState ? 'block' : 'hidden'}`}>
          <UpdateInfoForm />
        </div>
    </div>
    </>
  )
}

export default UserDetailsPage;