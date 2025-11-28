import React from "react";
import { GoalItem } from "./GoalItem";
import "./GoalList.css";

export const GoalList = ({ goals, setUserGoals }) => {
  const onDelete = (goalId) => {
    setUserGoals(goals.filter((goal) => goal.id != goalId));
  };

  return (
    <div className="goal-list">
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} onDelete={onDelete} />
      ))}
    </div>
  );
};
