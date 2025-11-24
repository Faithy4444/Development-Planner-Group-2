import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // to link to my goal form
import { GoalList } from "../components/goals/GoalList";
import "./DashboardPage.css";

const DashboardPage = () => {
  const [userGoals, setUserGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await fetch("/api/goals");
        if (!response.ok) throw new Error("Failed to fetch goals");

        const data = await response.json();
        setUserGoals(data || []);
      } catch (err) {
        console.error("Error fetching goals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Your Dashboard</h1>
        <Link to="/create-goal" className="btn-primary">
          Create New Goal
        </Link>
      </div>

      {userGoals && userGoals.length > 0 ? (
        <GoalList goals={userGoals} />
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
