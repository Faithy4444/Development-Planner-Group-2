import React from "react";
import "./TaskList.css";

export const TaskList = ({ tasks, onToggle }) => {
  const checkTask = async (id) => {
    try {
      const response = await fetch(`/api/tasks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: id,
        }),
      });

      onToggle(id);
      if (!response.ok) {
        throw new Error("Failed to save task");
      }
    } catch (err) {
      console.log("Error saving task:", err);
    }
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id} className={task.is_completed ? "completed" : ""}>
          <input
            type="checkbox"
            checked={task.is_completed}
            onChange={() => checkTask(task.id)}
          />
          <span>{task.title}</span>
        </li>
      ))}
    </ul>
  );
};
