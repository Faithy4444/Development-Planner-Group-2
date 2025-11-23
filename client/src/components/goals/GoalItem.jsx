// src/components/goals/GoalItem.jsx
import React, { useState } from "react";
import { TaskList } from "../tasks/TaskList";
import { AddTaskForm } from "../tasks/AddTaskForm";
import "./GoalItem.css";

export const GoalItem = ({ goal }) => {
  const [tasks, setTasks] = useState(goal.tasks || []);
  const [showAddForm, setShowAddForm] = useState(false);

  const totalTasks = goal.tasks.length;
  const completedTasks = goal.tasks.filter((task) => task.is_completed).length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleAddTaskClick = () => {
    setShowAddForm(true);
  };

  const handleSaveTask = async (newTask) => {
    // try {
    //   // POST request to backend API
    //   const response = await fetch(`/api/tasks`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       goalId: goal.id,
    //       title: newTask.title,
    //     }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Failed to save task");
    //   }

    //   // const savedTask = await response.json();
    //    const savedTask = { id: 5, title: "API", is_completed: false },

    //   // Update UI
    //   setTasks((prev) => [...prev, savedTask]);

    //   setShowAddForm(false);
    // } catch (err) {
    //   console.log("Error saving task:", err);
    // }
    const savedTask = { id: 5, title: "API", is_completed: false };

    // Update UI
    setTasks((prev) => [...prev, savedTask]);

    setShowAddForm(false);
  };

  // const handleAdTask = () => {
  //   //show the inline form
  //   console.log(JSON.stringify(goal.tasks))
  //   // goal.
  // }
  return (
    <div className={`goal-item-container status-${goal.status}`}>
      <div className="goal-item-header">
        <h3>{goal.title}</h3>
        <div className="goal-actions">
          <button className="btn-icon">Edit</button>
          <button className="btn-icon">Delete</button>
        </div>
      </div>

      {/* UPDATED: The SMART Details Section now uses a grid */}
      <div className="goal-smart-details-grid">
        <div className="detail-item">
          <strong>Specific</strong>
          <p>{goal.specific}</p>
        </div>
        <div className="detail-item">
          <strong>Measurable</strong>
          <p>{goal.measurable}</p>
        </div>
        {/* --- NEW: Added Achievable and Relevant --- */}
        <div className="detail-item">
          <strong>Achievable</strong>
          <p>{goal.achievable}</p>
        </div>
        <div className="detail-item">
          <strong>Relevant</strong>
          <p>{goal.relevant}</p>
        </div>
      </div>

      <div className="goal-progress">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <span className="progress-text">{progressPercentage}% complete</span>
      </div>

      <h4 className="tasks-header">Tasks</h4>
      <TaskList tasks={goal.tasks} />

      {/* Show Add Task Form */}
      {showAddForm ? (
        <AddTaskForm onSave={handleSaveTask} />
      ) : (
        <div className="goal-footer">
          <button onClick={handleAddTaskClick} className="btn-add-task">
            + Add Task
          </button>
        </div>
      )}
    </div>
  );
};
