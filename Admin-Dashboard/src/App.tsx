import { Route, Routes } from 'react-router-dom';
import './App.css'
import DashboardWrapper from './DashboardWrapper'
import Dashboard from './pages/Dashboard'

function App() {

  return (
      <DashboardWrapper>
        <Routes>
          <Route path = "/" element={<Dashboard />} />
        </Routes>
      </DashboardWrapper>
  )
}

export default App
