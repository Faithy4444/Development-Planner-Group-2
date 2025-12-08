import React, { useState } from "react";
import { TaskList } from "../tasks/TaskList";
import { AddTaskForm } from "../tasks/InlineTaskForm";
import "./GoalItem.css";
import { useFetch } from "../../useFetch";
import { Modal } from "../modals/modal";
import { createPortal } from "react-dom";
import { goalSchema } from "../../validation/goalSchema.js";

export const GoalItem = ({
  goal,
  updateGoalPrivacy,
  updateGoalCompletion,
  onDelete,
  editGoal,
}) => {
  const [tasks, setTasks] = useState(goal.tasks || []);
  const [showAddForm, setShowAddForm] = useState(false);
  const { executeFetch, loading, error } = useFetch();

  const [PrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(goal.is_completed);

  const [isEditing, setIsEditing] = useState(false);

  const [editedGoal, setEditedGoal] = useState(goal);

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

  const handleGoalDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this goal?"
    );
    if (!confirmed) return;

    const result = await executeFetch(`/api/goals/${goal.id}`, "DELETE");

    if (result !== null) {
      onDelete(goal.id);
    }
  };

  const handleGoalEdit = async () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    // Convert time_bound string → Date or null
    const convertGoal = {
      ...editedGoal,
      time_bound: editedGoal.time_bound
        ? new Date(editedGoal.time_bound)
        : null,
    };

    const check = goalSchema.safeParse(convertGoal);
    if (!check.success) {
      const messages = check.error.issues.map((err) => err.message).join("\n");

      alert(messages);
      return;
    }

    // If valid → send to server
    const validGoal = { ...goal, ...check.data };
    const result = await executeFetch(
      `/api/goals/${goal.id}`,
      "PUT",
      validGoal
    );

    if (result) {
      // update the goal in the dashboard (parent)
      editGoal(goal.id, editedGoal);
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handlePrivacy = async () => {
    const result = await executeFetch(`/api/goals/privacy/${goal.id}`, "PUT");
    if (result) {
      // Update state in Dashboard
      updateGoalPrivacy(goal.id, result.newValue);
    }
  };

  //I declared task save function here, because we need to know under which goal we are creating a task, which is not obvious for task form.
  const handleSaveTask = async (newTask) => {
    const body = {
      goal_id: goal.id,
      title: newTask.title,
    };
    const savedTask = await executeFetch("/api/tasks", "POST", body);
    // Update state and ui
    setTasks((prev) => [...prev, savedTask]);
    setShowAddForm(false);
  };

  const handleDeleteTask = async (taskId) => {
    setTasks(tasks.filter((task) => task.id != taskId));
  };

  const handleEditTask = async (editedTask) => {
    setTasks((tasks) =>
      tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
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
          <button className="btn-icon" onClick={handleGoalEdit}>
            Edit
          </button>
          <button className="btn-icon" onClick={handleGoalDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="goal-smart-details-grid">
        {/* Title */}
        <div className="detail-item">
          <strong>Title</strong>
          {isEditing ? (
            <input
              value={editedGoal.title}
              onChange={(e) =>
                setEditedGoal({ ...editedGoal, title: e.target.value })
              }
            />
          ) : (
            <p>{goal.title}</p>
          )}
        </div>

        {/* Specific */}
        <div className="detail-item">
          <strong>Specific</strong>
          {isEditing ? (
            <textarea
              value={editedGoal.specific}
              onChange={(e) =>
                setEditedGoal({ ...editedGoal, specific: e.target.value })
              }
            />
          ) : (
            <p>{goal.specific}</p>
          )}
        </div>

        {/* Measurable */}
        <div className="detail-item">
          <strong>Measurable</strong>
          {isEditing ? (
            <textarea
              value={editedGoal.measurable}
              onChange={(e) =>
                setEditedGoal({ ...editedGoal, measurable: e.target.value })
              }
            />
          ) : (
            <p>{goal.measurable}</p>
          )}
        </div>

        {/* Achievable */}
        <div className="detail-item">
          <strong>Achievable</strong>
          {isEditing ? (
            <textarea
              value={editedGoal.achievable}
              onChange={(e) =>
                setEditedGoal({ ...editedGoal, achievable: e.target.value })
              }
            />
          ) : (
            <p>{goal.achievable}</p>
          )}
        </div>

        {/* Relevant */}
        <div className="detail-item">
          <strong>Relevant</strong>
          {isEditing ? (
            <textarea
              value={editedGoal.relevant}
              onChange={(e) =>
                setEditedGoal({ ...editedGoal, relevant: e.target.value })
              }
            />
          ) : (
            <p>{goal.relevant}</p>
          )}
        </div>

        {/* Time Bound */}
        <div className="detail-item">
          <strong>Time Bound</strong>
          {isEditing ? (
            <input
              type="date"
              value={editedGoal.time_bound.split("T")[0]}
              onChange={(e) =>
                setEditedGoal({ ...editedGoal, time_bound: e.target.value })
              }
            />
          ) : (
            <p>
              {new Date(goal.time_bound).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="edit-actions">
          <button onClick={handleSaveEdit} className="btn-save">
            Save
          </button>
          <button onClick={handleCancelEdit} className="btn-cancel">
            Cancel
          </button>
        </div>
      )}

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
        handleEditTask={handleEditTask}
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
