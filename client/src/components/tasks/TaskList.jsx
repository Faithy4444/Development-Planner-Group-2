import React, { useState } from "react";
import "./TaskList.css";
import { useFetch } from "../../useFetch";

export const TaskList = ({ tasks, onToggle }) => {
  const { executeFetch } = useFetch();
  const [openMenuId, setOpenMenuId] = useState(null);

  const checkTask = async (id) => {
    const data = await executeFetch(`/api/tasks/${id}`, "PUT");
    if (data !== undefined && data !== null) {
      onToggle(id);
    }
  };
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

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
                <button>Delete</button>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};
