import React from "react";
import "./TaskList.css";
import { useFetch } from "../../useFetch";

export const TaskList = ({ tasks, onToggle }) => {
  const { executeFetch } = useFetch();

  const checkTask = async (id) => {
    const body = { taskId: id };
    const data = await executeFetch("/api/tasks", "PUT", body);
    console.log(data);
    if (data !== undefined && data !== null) {
      onToggle(id);
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
