import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../useFetch';
import { GoalItem } from '../components/goals/GoalItem';
import './SharedUserPlanPage.css'; 

const SharedUserPlanPage = () => {
  const { userId } = useParams();
  const { data: planData, loading, error } = useFetch(`/api/public/user/${userId}/plan`);

  if (loading) {
    return <div className="shared-plan-container"><p>Loading plan...</p></div>;
  }
  if (error) {
    return <div className="shared-plan-container"><p className="error-message">Error: {error}</p></div>;
  }
  if (!planData) {
    return <div className="shared-plan-container"><p>No plan data found.</p></div>;
  }

  return (
    <div className="shared-plan-container">
      <header className="shared-plan-header">
        <h1>Development Plan</h1>
        <p>A set of public goals from the plan of {planData.owner_username}</p>
      </header>

      <div className="goals-list-public">
        {planData.public_goals.map(goal => (
          <GoalItem key={goal.id} goal={goal} isPublicView={true} />
        ))}
      </div>

      <div className="feedback-section">
        <h2>Leave Feedback on this Plan</h2>
        <p>The feedback form will be implemented in a future ticket.</p>
      </div>
    </div>
  );
};

export default SharedUserPlanPage;