import React, { useState, useEffect } from "react";
import "./TaskList.css";
import { useFetch } from "../../useFetch";
import { taskSchema } from "../../validation/taskSchema";

export const TaskList = ({
  tasks,
  onToggle,
  handleDeleteTask,
  handleEditTask,
}) => {
  const { executeFetch, error } = useFetch();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editedTask, setEditedTask] = useState(null);

  const checkTask = async (id) => {
    const data = await executeFetch(`/api/tasks/complete/${id}`, "PUT");
    if (data !== undefined && data !== null) {
      onToggle(id);
    }
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const deleteTask = async (id) => {
    const response = await executeFetch(`/api/tasks/${id}`, "DELETE");
    if (response?.msg === "Task deleted successfully.") {
      handleDeleteTask(id);
      setOpenMenuId(null);
    }
  };

  const startEditing = (task) => {
    setEditedTask(task); // full task object
    setOpenMenuId(null);
  };

  const cancelEditing = () => {
    setEditedTask(null);
  };

  const saveTask = async () => {
    const check = taskSchema.safeParse({ title: editedTask.title });

    if (!check.success) {
      alert(check.error.issues.map((e) => e.message).join("\n"));
      return;
    }

    const result = await executeFetch(
      `/api/tasks/${editedTask.id}`,
      "PUT",
      editedTask
    );

    if (result) {
      handleEditTask(editedTask);
      cancelEditing();
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest(".menu-wrapper")) {
        setOpenMenuId(null);
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <ul className="task-list">
      {tasks.map((task) => {
        const isEditing = editedTask?.id === task.id;

        return (
          <li
            key={task.id}
            className={`task-item ${task.is_completed ? "completed" : ""}`}
          >
            {/* LEFT SIDE */}
            <div className="left-content">
              <input
                type="checkbox"
                checked={task.is_completed}
                onChange={() => checkTask(task.id)}
              />

              {!isEditing ? (
                <span>{task.title}</span>
              ) : (
                <input
                  autoFocus
                  className="task-edit-input"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({
                      ...editedTask,
                      title: e.target.value,
                    })
                  }
                />
              )}
            </div>

            {/* RIGHT SIDE: MENU OR ACTION BUTTONS */}
            {!isEditing ? (
              <div className="menu-wrapper">
                <button
                  className="menu-button"
                  onClick={() => toggleMenu(task.id)}
                >
                  ⋯
                </button>

                {openMenuId === task.id && (
                  <div className="dropdown-menu">
                    <button onClick={() => startEditing(task)}>Edit</button>
                    <button onClick={() => deleteTask(task.id)}>Delete</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="edit-actions">
                <button className="btn-save" onClick={saveTask}>
                  Save
                </button>
                <button className="btn-cancel" onClick={cancelEditing}>
                  Cancel
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
