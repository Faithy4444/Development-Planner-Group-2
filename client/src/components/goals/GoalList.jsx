import React, { useState } from "react";
import { GoalItem } from "./GoalItem";
import "./GoalList.css";

export const GoalList = ({ goals, setUserGoals }) => {
  const onDelete = (goalId) => {
    setUserGoals(goals.filter((goal) => goal.user_id != goalId));
  };

  return (
    <div className="goal-list">
      {goals.map((goal) => (
        <GoalItem key={goal.id} goal={goal} onDelete={onDelete} />
      ))}
    </div>
  );
};
