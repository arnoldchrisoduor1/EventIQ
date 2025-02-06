import { Route, Routes } from 'react-router-dom';
import './App.css'
import DashboardWrapper from './DashboardWrapper'
import Dashboard from './pages/Dashboard'
import Authentication from './pages/Authentication.page';
import UserDetailsPage from './pages/UserDetails.page';
import EventsPage from './pages/EventsPage';
import AddEvent from './pages/AddEvent';

function App() {

  return (
      <DashboardWrapper>
        <Routes>
          <Route path = "/" element={<Dashboard />} />
          <Route path = "/signup" element={<Authentication />} />
          <Route path = "/login" element={<Authentication />} />
          <Route path = "/verify-email" element={<Authentication />} />
          <Route path = "/reset-password/:token?" element={<Authentication />} />
          <Route path = "/forgot-password" element={<Authentication />} />
          <Route path = "/user-details" element={<UserDetailsPage />} />
          <Route path = "/events" element={<EventsPage />} />
          <Route path = "/create-event" element={<AddEvent />} />
        </Routes>
      </DashboardWrapper>
  )
}

export default App
