import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SharedGoalPage.css'; 

const SharedGoalPage = () => {
  const { id } = useParams(); // Gets the goal's ID from the URL
  const [goalData, setGoalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [mentorName, setMentorName] = useState("");

  useEffect(() => {
    const fetchGoal = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        // Call the new public endpoint with the goal's ID.
        const response = await fetch(`${apiUrl}/api/public/goal/${id}`);
        
        if (!response.ok) {
          throw new Error('This goal is private or does not exist.');
        }
        const data = await response.json();
        setGoalData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGoal();
  }, [id]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // This is a placeholder for now. A future ticket will send this to the backend.
    console.log("Feedback submitted:", { mentorName, feedback });
    alert("Thank you! Your feedback has been sent.");
    setFeedback("");
    setMentorName("");
  };

  if (loading) return <div className="shared-goal-container"><p>Loading goal...</p></div>;
  if (error) return <div className="shared-goal-container"><p className="error-message">{error}</p></div>;

  return (
    <div className="shared-goal-container">
      <header className="shared-goal-header">
        <h1>{goalData.goal.title}</h1>
        <p>A goal from the development plan of {goalData.owner_username}</p>
      </header>

      <div className="goal-card-public">
        <h3>SMART Details</h3>
        <p><strong>Specific:</strong> {goalData.goal.specific}</p>
        <p><strong>Measurable:</strong> {goalData.goal.measurable}</p>
        <p><strong>Achievable:</strong> {goalData.goal.achievable}</p>
        <p><strong>Relevant:</strong> {goalData.goal.relevant}</p>
      </div>

      <div className="tasks-section-public">
        <h3>Tasks</h3>
        <ul>
          {goalData.goal.tasks.map(task => (
            <li key={task.id} className={task.is_completed ? 'completed' : ''}>
              {task.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="feedback-section">
        <h2>Leave Feedback</h2>
        <form onSubmit={handleFeedbackSubmit}>
          <input 
            type="text"
            placeholder="Your name"
            value={mentorName}
            onChange={(e) => setMentorName(e.target.value)}
            required
          />
          <textarea
            rows="5"
            placeholder="Your advice and suggestions for this goal..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <button type="submit" className="btn-primary">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};
export default SharedGoalPage;