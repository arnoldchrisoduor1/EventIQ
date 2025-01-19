import { Route, Routes } from 'react-router-dom';
import './App.css'
import DashboardWrapper from './DashboardWrapper'
import Dashboard from './pages/Dashboard'
import EmailVerificationPage from './components/EmailVerificationPage';

function App() {

  return (
      <DashboardWrapper>
        <Routes>
          <Route path = "/" element={<Dashboard />} />
          <Route path = "/verify-email" element={<EmailVerificationPage />} />
        </Routes>
      </DashboardWrapper>
  )
}

export default App
