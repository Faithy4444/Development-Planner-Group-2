import React, { useState, useEffect } from 'react';
import { useFetch } from '../../useFetch';
import './SharePlanModal.css'; // Use its own, new CSS file

export const SharePlanModal = ({ isOpen, onClose, goals, userId, updateGoalPrivacy }) => {
  const [selectedGoalIds, setSelectedGoalIds] = useState([]);
  const { executeFetch, loading, error } = useFetch();

  // Pre-select the checkboxes for goals that are already public.
  useEffect(() => {
    if (isOpen && goals) {
      const alreadyPublicIds = goals.filter(g => !g.is_private).map(g => g.id);
      setSelectedGoalIds(alreadyPublicIds);
    }
  }, [isOpen, goals]);

  const handleCheckboxChange = (goalId) => {
    setSelectedGoalIds(prev =>
      prev.includes(goalId) ? prev.filter(id => id !== goalId) : [...prev, goalId]
    );
  };

  const handleSavePrivacy = async () => {
    const result = await executeFetch('/api/goals/privacy', 'PUT', { publicGoalIds: selectedGoalIds });
    if (result) {
      // Update the parent dashboard's state immediately
      goals.forEach(goal => {
        const isNowPublic = selectedGoalIds.includes(goal.id);
        if (goal.is_private === isNowPublic) {
          updateGoalPrivacy(goal.id, !isNowPublic);
        }
      });
      alert('Privacy settings saved!');
      onClose();
    }
  };

  const handleGetShareLink = () => {
    if (!userId) return;
    const shareLink = `${window.location.origin}/share/user/${userId}`;
    window.prompt("Here is the shareable link for all your public goals:", shareLink);
  };
  
  if (!isOpen) return null;

  return (
    // Use a new, specific class name for the overlay
    <div className="share-plan-modal-overlay" onClick={onClose}>
      <div className="share-plan-modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>&times;</button>
        <h2>Share Your Goal (s) </h2>
        
        <div className="modal-section">
          <h4>Step 1: Choose which goals to share</h4>
          <p>Select the goals you want to make public for your mentor to see.</p>
          <div className="goal-selection-list">
            {goals && goals.length > 0 ? (
              goals.map(goal => (
                <div key={goal.id} className="goal-checkbox-item">
                  <input
                    type="checkbox"
                    id={`goal-share-${goal.id}`}
                    checked={selectedGoalIds.includes(goal.id)}
                    onChange={() => handleCheckboxChange(goal.id)}
                  />
                  <label htmlFor={`goal-share-${goal.id}`}>{goal.title}</label>
                </div>
              ))
            ) : (
              <p>You haven't created any goals yet.</p>
            )}
          </div>
        </div>

        <div className="modal-section">
          <h4>Step 2: Generate link for your mentor </h4>
          <button onClick={handleGetShareLink} className="btn-secondary" disabled={selectedGoalIds.length === 0}>
            Get Share Link
          </button>
          {selectedGoalIds.length === 0 && <p className="disabled-note">You must select at least one goal to generate a link.</p>}
        </div>
        
        <div className="modal-actions">
          <button onClick={onClose} className="btn-tertiary">Cancel</button>
          <button onClick={handleSavePrivacy} className="btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
        
        {error && <p className="error-message modal-error">{error}</p>}
      </div>
    </div>
  );
};