import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateGoalPage from './pages/CreateGoalPage';
 
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create-goal" element={<CreateGoalPage />} />
    </Routes>
  );
}

export default App; 