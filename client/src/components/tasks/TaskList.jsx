import React, { useState } from "react";
import "./TaskList.css";

export const TaskList = ({ tasks }) => {
  // using local state change because I didn't connect backend
  const [localTasks, setLocalTasks] = useState(tasks);

  const toggleTask = (id) => {
    setLocalTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, is_completed: !task.is_completed } : task
      )
    );
  };

  return (
    <ul className="task-list">
      {localTasks.map((task) => (
        <li key={task.id} className={task.is_completed ? "completed" : ""}>
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={() => toggleTask(task.id)}
          />
          <span>{task.title}</span>
        </li>
      ))}
    </ul>
  );
};
