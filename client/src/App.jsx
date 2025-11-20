import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your page components
import LandingPage from './pages/LandingPage';
import CreateGoalPage from './pages/CreateGoalPage';

// Import any global styles you need
// import './styles/global.css';

function App() {
  return (
    <Routes>
      {/* Route for the main landing page */}
      <Route path="/" element={<LandingPage />} />

      {/* Route for the goal creation form */}
      <Route path="/create-goal" element={<CreateGoalPage />} />

      {/* You can add more pages here later, like the dashboard */}
      {/* <Route path="/dashboard" element={<DashboardPage />} /> */}
    </Routes>
  );
}

export default App;