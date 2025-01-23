import { Route, Routes } from 'react-router-dom';
import './App.css'
import DashboardWrapper from './DashboardWrapper'
import Dashboard from './pages/Dashboard'
import Authentication from './pages/Authentication.page';
import UserDetailsPage from './pages/UserDetails.page';

function App() {

  return (
      <DashboardWrapper>
        <Routes>
          <Route path = "/" element={<Dashboard />} />
          <Route path = "/signup" element={<Authentication />} />
          <Route path = "/login" element={<Authentication />} />
          <Route path = "/verify-email" element={<Authentication />} />
          <Route path = "/user-details" element={<UserDetailsPage />} />
        </Routes>
      </DashboardWrapper>
  )
}

export default App
