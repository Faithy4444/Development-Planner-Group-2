import React, { useState } from "react";
import { TaskList } from "../tasks/TaskList";
import { AddTaskForm } from "../tasks/InlineTaskForm";
import "./GoalItem.css";
import { useFetch } from "../../useFetch";
import { Modal } from "../modals/modal";
import { createPortal } from "react-dom";

export const GoalItem = ({
  goal,
  updateGoalPrivacy,
  updateGoalCompletion,
  onDelete,
}) => {
  const [tasks, setTasks] = useState(goal.tasks || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const { executeFetch, loading, error } = useFetch();
  const [isCompleted, setIsCompleted] = useState(goal.is_completed);
  //toggle logic
  const handleToggleComplete = async () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    updateGoalCompletion(goal.id, newState);

    try {
      const data = await executeFetch(
        `/api/goals/${goal.id}/complete`,
        "PATCH"
      );
      console.log("Toggle response:", data);
    } catch (err) {
      setIsCompleted(!newState);
      updateGoalCompletion(goal.id, !newState);
      console.error(err);
      alert("Couldn't update goal 😭");
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleAddTaskClick = () => setShowAddForm(true);

  const handleToggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, is_completed: !task.is_completed }
          : task
      )
    );
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?"
    );
    if (!confirmed) return;

    const result = await executeFetch(`/api/goals/${goal.id}`, "DELETE");

    if (result !== null) {
      onDelete(goal.id);
    }
  };

  //I declared task save function here, because we need to know under which goal we are creating a task, which is not obvious for task form.
  const handleSaveTask = async (newTask) => {
    const body = {
      goal_id: goal.id,
      title: newTask.title,
      user_id: 3,
    };
    const savedTask = await executeFetch("/api/tasks", "POST", body);
    // Update state and ui
    setTasks((prev) => [...prev, savedTask]);
    setShowAddForm(false);
  };

  const handleDeleteTask = async (taskId) => {
    setTasks(tasks.filter((task) => task.id != taskId));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading goals: {error}</p>;

  // Add this new function inside your GoalItem component.
  const handleShare = async () => {
    // Confirm with the user first
    const wantsToShare = window.confirm(
      "This will make your goal public and generate a shareable link. Are you sure?"
    );

    if (wantsToShare) {
      try {
        const token = localStorage.getItem('token');
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

        // Call the new backend endpoint to toggle the privacy
        const response = await fetch(`${apiUrl}/api/goals/${goal.id}/toggle-privacy`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to update goal privacy.');
        }

        const data = await response.json();
        const isNowPublic = !data.newValue; // Your controller returns the OLD value for some reason, so we flip it.

        if (isNowPublic) {
          // Construct the full shareable link for the mentor
          const shareLink = `${window.location.origin}/share/goal/${goal.id}`;
          
          // Show the link to the user so they can copy it
          window.prompt("Your goal is now public! Copy this link to share with your mentor:", shareLink);
        } else {
          alert("Your goal has been made private again.");
        }

      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    }
  };

  return (
    <div className={`goal-item-container status-${goal.status}`}>
      <div className="goal-item-header">
        <h3>{goal.title}</h3>
        <div className="goal-actions">
          {/* Share button */}
          <button onClick={handleShare} className="btn-icon">Share</button>
          {/* Share button */}
          <label className="btn-icon" style={{ cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleToggleComplete}
              style={{ marginRight: "6px" }}
            />
            {isCompleted ? "Completed" : "Mark Goal complete"}
          </label>
          
          <button className="btn-icon">Edit</button>
          <button className="btn-icon" onClick={handleDelete}>
            Delete
          </button>
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
        <div className="detail-item">
          <strong>Time bound</strong>
          {/* <p>{time_bound}</p> */}
          <p>
            {/* need to convert date from iso format to more user-friendly interface */}
            {new Date(goal.time_bound).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
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
      <TaskList
        tasks={tasks}
        onToggle={handleToggleTask}
        handleDeleteTask={handleDeleteTask}
      />

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