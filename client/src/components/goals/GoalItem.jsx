import React, { useState } from "react";
import { TaskList } from "../tasks/TaskList";
import { AddTaskForm } from "../tasks/InlineTaskForm";
import "./GoalItem.css";
import { useFetch } from "../../useFetch";
import { Modal } from "../modals/modal";
import { createPortal } from "react-dom";




export const GoalItem = ({ goal, updateGoalPrivacy,updateGoalCompletion, onDelete }) => {
  const [tasks, setTasks] = useState(goal.tasks || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const { executeFetch, loading, error } = useFetch();

  const [PrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(goal.is_completed);
  
  //toggle logic
  const handleToggleComplete = async () => {
    const newState = !isCompleted;
    setIsCompleted(newState);
    updateGoalCompletion(goal.id, newState);
  
    try {
      const data = await executeFetch(`http://localhost:5000/api/goals/${goal.id}/complete`,"PATCH");
      console.log("Toggle response:", data);
    } catch (err) {
       setIsCompleted(!newState);
       updateGoalCompletion(goal.id, !newState);
       console.error(err);
       alert("Couldn't update goal 😭");
    }
  };

  const openPrivacyModal = () => setPrivacyModalOpen(true);
  const closePrivacyModal = () => setPrivacyModalOpen(false);

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
    const result = await executeFetch(`/api/goals/${goal.id}`, "DELETE");

    if (result !== null) {
      onDelete(goal.id);
    }
  };

  const handlePrivacy = async () => {
    const result = await executeFetch(`/api/goals/privacy/${goal.id}`, "PUT");
    if (result) {
      // Update state in Dashboard
      updateGoalPrivacy(goal.id, result.newValue);
    }

    closePrivacyModal();
  };

  //I declared task save function here, because we need to know under which goal we are creating a task, which is not obvious for task form.
  const handleSaveTask = async (newTask) => {
    const body = {
      goal_id: goal.id,
      title: newTask.title,
      user_id: 6,
    };
    const savedTask = await executeFetch("/api/tasks", "POST", body);
    // Update state and ui
    setTasks((prev) => [...prev, savedTask]);
    setShowAddForm(false);
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading goals: {error}</p>;

  return (
    <div className={`goal-item-container status-${goal.status}`}>
      <div className="goal-item-header">
        <h3>{goal.title}</h3>
        <div className="goal-actions">
          <button className="btn-icon" onClick={openPrivacyModal}>
            Change plan privacy:
            {goal.is_private ? " Private" : " Public"}
          </button>
          <label className="btn-icon" style={{ cursor: "pointer" }}>
            <input
            type="checkbox"
            checked={isCompleted}
            onChange={handleToggleComplete}
            style={{ marginRight: "6px" }}
           />
           {isCompleted ? "Completed" : "Mark Goal complete"}
          </label>
          {createPortal(
            <Modal
              isOpen={PrivacyModalOpen}
              privateSetting={goal.is_private}
              onChange={handlePrivacy}
              onClose={closePrivacyModal}
              goalId={goal.id}
            />,
            document.body
          )}
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
