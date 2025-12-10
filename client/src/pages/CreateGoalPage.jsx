import React from "react";
import { GoalForm } from "../components/goals/GoalForm";
import { Link } from "react-router-dom";

const CreateGoalPage = () => {
  return (
    <div>
      <Link to="/dashboard" className="btn-primary">
        Go back to dashboard
      </Link>
      <GoalForm />
    </div>
  );
};

export default CreateGoalPage;
