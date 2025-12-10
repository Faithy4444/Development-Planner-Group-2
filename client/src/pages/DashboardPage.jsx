import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // to link to my goal form
import { GoalList } from "../components/goals/GoalList";
import { SharePlanModal } from "../components/modals/SharePlanModal";
import { FeedbackList } from "../components/feedback/FeedbackList";
import "./DashboardPage.css";
import { useFetch } from "../useFetch";

const DashboardPage = () => {
  const [userGoals, setUserGoals] = useState([]);
  const [isShareModalOpen, setShareModalOpen] = useState(false);
const [feedback, setFeedback] = useState([]);
  const { executeFetch, loading, error } = useFetch();
// This is the corrected useEffect block for your DashboardPage.jsx

useEffect(() => {
  const fetchDashboardData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found. User is not authenticated.");
      return;
    }
    
    // This options object is now CORRECT and can be reused.
    const options = {
      headers: {
        'Authorization': `Bearer ${token}`, // <-- THE FIX
      },
    };

    // Fetch the goals using the corrected options.
    const goalsData = await executeFetch("/api/goals", "GET", null, options);
    setUserGoals(goalsData || []);

    // --- ADD THIS NEW PART: Fetch the feedback using the same options ---
    const feedbackData = await executeFetch("/api/users/feedback", "GET", options);
    setFeedback(feedbackData || []);
  };

  fetchDashboardData();
}, [executeFetch]);

  // --- SORT WITHOUT MUTATING STATE ---
  const sortedGoals = [...userGoals].sort((a, b) => {
    return Number(a.is_completed) - Number(b.is_completed);
  });
  const updateGoalPrivacy = (goalId, newPrivacy) => {
    setUserGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, is_private: newPrivacy } : g))
    );
  };
  const updateGoalCompletion = (id, newValue) => {
    setUserGoals((prevGoals) =>
      prevGoals.map((g) => (g.id === id ? { ...g, is_completed: newValue } : g))
    );
  };
  const deleteGoal = (goalId) => {
    setUserGoals(userGoals.filter((goal) => goal.id != goalId));
  };

  // ADDED: Missing editGoal function
  const editGoal = (goalId, editedGoal) => {
    setUserGoals((prevGoals) =>
      prevGoals.map((goal) => (goal.id === goalId ? editedGoal : goal))
    );
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading goals: {error}</p>;
  // This is the updated return statement for DashboardPage.jsx

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Dashboard</h1>
        <div>
          <button
            onClick={() => setShareModalOpen(true)}
            className="btn-primary"
          >
            Share Goal(s)
          </button>
          <Link
            to="/create-goal"
            className="btn-primary"
            style={{ marginLeft: "1rem" }}
          >
            Create New Goal
          </Link>
        </div>
      </div>

{userGoals && userGoals.length > 0 ? (
      <GoalList
        goals={sortedGoals}
        editGoal={editGoal}
        setUserGoals={setUserGoals}
        updateGoalPrivacy={updateGoalPrivacy}
        deleteGoal={deleteGoal}
        updateGoalCompletion={updateGoalCompletion}
      />
    ) : (
      <div className="empty-state">
      </div>
    )}
    {!loading && <FeedbackList feedbackItems={feedback} />}
    <SharePlanModal 
      isOpen={isShareModalOpen}
      onClose={() => setShareModalOpen(false)}
      goals={userGoals}
      userId={userGoals.length > 0 ? userGoals[0].user_id : null}
      updateGoalPrivacy={updateGoalPrivacy}
    />
  </div>
  
);
};
export default DashboardPage;