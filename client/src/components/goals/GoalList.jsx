import React from "react";
import { GoalItem } from "./GoalItem";
import "./GoalList.css";

export const GoalList = ({
  goals,
  updateGoalPrivacy,
  deleteGoal,
  updateGoalCompletion,
}) => {
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
