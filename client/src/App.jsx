import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import { MainLayout } from './components/layout/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import CreateGoalPage from './pages/CreateGoalPage';
import SharedUserPlanPage from './pages/SharedUserPlanPage';
import './styles/global.css';
 
function App() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={<LandingPage />} />
      {/* The LandingPage now contains the login/register forms */}
      {/*private route for logged in users security checkpoint */}
      <Route path="/share/user/:userId" element={<SharedUserPlanPage />} />
      <Route element={<ProtectedRoute />}>
        {/* All routes nested inside here are now protected */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create-goal" element={<CreateGoalPage />} />
        </Route>
      </Route>

    </Routes>
  );
}

export default App;