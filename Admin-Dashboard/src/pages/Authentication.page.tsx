import { useLocation } from 'react-router-dom';
import backgorundImage from '../assets/img/eventsBanner1.jpg';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import EmailVerificationPage from '../components/EmailVerificationPage';


const Authentication = () => {
    const location = useLocation();
    const path = location.pathname; // accessing the current path (/signup / login).

  return (
    <div className="h-[100vh] w-full bg-cover bg-center relative overflow-hidden m-auto"
    style={{ backgroundImage: `url(${backgorundImage})` }}
    >
        {/* Black overlay */}
        <div className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'></div>
        <div className='relative z-10 w-full h-full top-[20%]'>
            {path === '/signup' ? (
            <div className=''>
                <SignUp />
            </div>
            ) : path === "/login" ? (
            <div>
                <Login />
            </div>
            ) : (
                <div>
                    <EmailVerificationPage />
                </div>
            )}
        </div>
    </div>
  )
}

export default Authentication;