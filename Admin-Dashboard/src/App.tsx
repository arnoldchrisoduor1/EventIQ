import { Route, Routes } from 'react-router-dom';
import './App.css'
import DashboardWrapper from './DashboardWrapper'
import Dashboard from './pages/Dashboard'
import EmailVerificationPage from './components/EmailVerificationPage';
import SignUp from './components/SignUp';

function App() {

  return (
      <DashboardWrapper>
        <Routes>
          <Route path = "/" element={<Dashboard />} />
          <Route path = "/signup" element={<SignUp />} />
          <Route path = "/verify-email" element={<EmailVerificationPage />} />
        </Routes>
      </DashboardWrapper>
  )
}

export default App
