import React from 'react';
import './FeedbackList.css';

export const FeedbackList = ({ feedbackItems }) => {
  if (!feedbackItems || feedbackItems.length === 0) {
    return (
      <div className="feedback-list-container">
        <h2>Mentor Feedback</h2>
        <p>You have not received any feedback yet.</p>
      </div>
    );
  }

  return (
    <div className="feedback-list-container">
      <h2>Mentor Feedback</h2>
      <div className="feedback-list">
        {feedbackItems.map(item => (
          <div key={item.id} className="feedback-item">
            <div className="feedback-item-header">
              <strong>From: {item.mentor_name}</strong>
              <span className="feedback-date">
                {new Date(item.created_at).toLocaleDateString("en-GB")}
              </span>
            </div>
            <p className="feedback-text">{item.feedback_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};