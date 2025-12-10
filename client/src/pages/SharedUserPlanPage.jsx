import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../useFetch';
import { GoalItem } from '../components/goals/GoalItem';
import './SharedUserPlanPage.css'; 

const SharedUserPlanPage = () => {
  const { userId } = useParams();
  const { executeFetch, loading, error } = useFetch();
  const [planData, setPlanData] = useState(null);

  const [mentorName, setMentorName] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchPublicPlan = async () => {
      const data = await executeFetch(`/api/public/user/${userId}/plan`);
      if (data) {
        setPlanData(data);
      }
    };

    fetchPublicPlan();
  }, [userId, executeFetch]);

  if (loading) {
    return <div className="shared-plan-container"><p>Loading plan...</p></div>;
  }
  if (error) {
    return <div className="shared-plan-container"><p className="error-message">Error: {error}</p></div>;
  }
  if (!planData || planData.public_goals.length === 0) {
    return (
        <div className="shared-plan-container">
            <header className="shared-plan-header">
                <h1>Development Plan</h1>
                <p>This user has not made any goals public at this time.</p>
            </header>
        </div>
    );
  }

//Feedback submittion handler
const handleFeedbackSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitSuccess(false);
  const result = await executeFetch(
    `/api/public/user/${userId}/feedback`,
    'POST',
    { 
      mentorName, 
      feedbackText 
    }
  );

  setIsSubmitting(false);
  if (result) {
    setSubmitSuccess(true);
    setMentorName('');
    setFeedbackText('');
  }
};

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
        {submitSuccess ? (
          <div className="feedback-success">
            <p>Thank you! Your feedback has been sent successfully.</p>
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit}>
            <div className="form-group">
              <label htmlFor="mentorName">Your Name</label>
              <input 
                id="mentorName"
                type="text"
                value={mentorName}
                onChange={(e) => setMentorName(e.target.value)}
                placeholder="e.g., Jane Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="feedbackText">Your Feedback</label>
              <textarea
                id="feedbackText"
                rows="5"
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Your advice and suggestions for this plan..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Submit Feedback'}
            </button>
            {/*a general error from the fetch hook if one occurs */}
            {error && <p className="error-message">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default SharedUserPlanPage;