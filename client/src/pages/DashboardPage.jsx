import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // to link to my goal form
import { GoalList } from "../components/goals/GoalList";
import "./DashboardPage.css";
import { useFetch } from "../useFetch";
const DashboardPage = () => {
  const [userGoals, setUserGoals] = useState([]);
  const { executeFetch, loading, error } = useFetch();
  useEffect(() => {
    const fetchGoals = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User is not authenticated.");
        return;
      }
      const options = {
        headers: {
          "x-auth-token": token,
        },
      };
      const data = await executeFetch("/api/goals", "GET", options);
      setUserGoals(data || []);
    };
    fetchGoals();
  }, [executeFetch]);

  const updateGoalPrivacy = (goalId, newPrivacy) => {
    setUserGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, is_private: newPrivacy } : g))
    );
  };

  const deleteGoal = (goalId) => {
    setUserGoals(userGoals.filter((goal) => goal.id != goalId));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading goals: {error}</p>;
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Dashboard</h1>
        <Link to="/create-goal" className="btn-primary">
          Create New Goal
        </Link>
      </div>
      {userGoals && userGoals.length > 0 ? (
        <GoalList
          goals={userGoals}
          setUserGoals={setUserGoals}
          updateGoalPrivacy={updateGoalPrivacy}
          deleteGoal={deleteGoal}
        />
      ) : (
        <div className="empty-state">
          <h2>Welcome to your planner!</h2>
          <p>
            You haven't created any goals yet. Click the button above to get
            started.
          </p>
        </div>
      )}
    </div>
  );
};
export default DashboardPage;
