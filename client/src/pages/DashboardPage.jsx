import React from 'react';
import { Link } from 'react-router-dom'; // to link to my goal form
import { mockGoals } from '../data/mockData';
import { GoalList } from '../components/goals/GoalList';
import './DashboardPage.css';


const DashboardPage = () => {
  const userGoals = mockGoals;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Dashboard</h1>
        <Link to="/create-goal" className='btn-primary'>Create New Goal</Link>
      </div>

      {userGoals && userGoals.length > 0 ? (
        <GoalList goals={userGoals} />
      ) : (
        <div className="empty-state">
          <h2>Welcome to your planner!</h2>
          <p>You haven't created any goals yet. Click the button above to get started.</p>
        </div>
      )}
    </div>
  );
};
export default DashboardPage;