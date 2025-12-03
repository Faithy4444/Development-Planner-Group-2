import React, { useState, useEffect } from "react";
import "./TaskList.css";
import { useFetch } from "../../useFetch";

export const TaskList = ({ tasks, onToggle, handleDeleteTask }) => {
  const { executeFetch } = useFetch();
  const [openMenuId, setOpenMenuId] = useState(null);

  const checkTask = async (id) => {
    const data = await executeFetch(`/api/tasks/complete/${id}`, "PUT");
    if (data !== undefined && data !== null) {
      onToggle(id);
    }
    console.log(data);
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const deleteTask = async (id) => {
    const response = await executeFetch(`/api/tasks/${id}`, "DELETE");
    console.log(response);
    if (response.message == "Task deleted successfully.") {
      console.log("del");
      handleDeleteTask(id);
      setOpenMenuId(null);
    }

    // ---- notes ----
    //After fronted receive successful message from backend
    //Frontend needs to tell the dashboard page to update userGoals state
  };

  // Close menu if clicking outside of dropdown
  useEffect(() => {
    const handleClick = (event) => {
      if (!event.target.closest(".menu-wrapper")) {
        setOpenMenuId(null);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.is_completed ? "completed" : ""}`}
        >
          <div className="left-content">
            <input
              type="checkbox"
              checked={task.is_completed}
              onChange={() => checkTask(task.id)}
            />
            <span>{task.title}</span>
          </div>

          <div className="menu-wrapper">
            <button className="menu-button" onClick={() => toggleMenu(task.id)}>
              ⋯
            </button>

            {openMenuId === task.id && (
              <div className="dropdown-menu">
                <button>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
