import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Public Pages
import LandingPage from './pages/LandingPage';

// Layout for Logged-In Users
import { MainLayout } from './components/layout/MainLayout';

// Pages for Logged-In Users
import DashboardPage from './pages/DashboardPage';
import CreateGoalPage from './pages/CreateGoalPage';

// Import your global styles
import './styles/global.css';
 
function App() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      {/* The Landing Page is the main entry point */}
      <Route path="/" element={<LandingPage />} />

      {/* You will add login/register routes here later */}
      {/* <Route path="/login" element={<LoginPage />} /> */}


      {/* --- Private Routes for Logged-In Users --- */}
      {/* All routes inside here will share the MainLayout (with the Navbar) */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create-goal" element={<CreateGoalPage />} />
      </Route>

    </Routes>
  );
}

export default App;