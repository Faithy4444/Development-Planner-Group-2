import React from "react";
import { GoalItem } from "./GoalItem";
import "./GoalList.css";

export const GoalList = ({ goals, setUserGoals, updateGoalPrivacy }) => {
  const onDelete = (goalId) => {
    setUserGoals(goals.filter((goal) => goal.id != goalId));
  };

  const updateGoalCompletion = (id, newValue) => {
  setUserGoals(prevGoals =>
    prevGoals.map(g =>
      g.id === id ? { ...g, is_completed: newValue } : g
    )
  );
};
  
  return (
    <div className="goal-list">
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          onDelete={deleteGoal}
          updateGoalPrivacy={updateGoalPrivacy}
          updateGoalCompletion={updateGoalCompletion}
        />
      ))}
    </div>
  );
};
