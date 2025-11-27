import React, { useState } from "react";
import { TaskList } from "../tasks/TaskList";
import { AddTaskForm } from "../tasks/InlineTaskForm";
import "./GoalItem.css";
import { useFetch } from "../../useFetch";

export const GoalItem = ({ goal, onDelete }) => {
  const [tasks, setTasks] = useState(goal.tasks || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const { executeFetch, loading, error } = useFetch();

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

  //--------Here I started to work on delete functionality---------

  const handleDelete = async () => {
    const result = await executeFetch(`/api/goals/${goal.id}`, "DELETE");

    if (result !== null) {
      // You need to notify the parent component (DashboardPage) to remove the goal from the list
      // This requires passing a prop, e.g., onDelete(goal.id)
      onDelete(goal.id);
    }
  };

  //I declared task save function here, because we need to know under which goal we are creating a task, which is not obvious for task form.
  const handleSaveTask = async (newTask) => {
    const body = {
      goalId: goal.id,
      title: newTask.title,
    };
    const savedTask = await executeFetch("/api/tasks", "POST", body);
    // Update state and ui
    setTasks((prev) => [...prev, savedTask]);
    console.log(savedTask);
    setShowAddForm(false);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading goals: {error}</p>;

  return (
    <div className={`goal-item-container status-${goal.status}`}>
      <div className="goal-item-header">
        <h3>{goal.title}</h3>
        <div className="goal-actions">
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
      <TaskList tasks={tasks} onToggle={handleToggleTask} />

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
