import React from 'react';
import './TaskList.css';

export const TaskList = ({ tasks }) => {
  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className={task.is_completed ? 'completed' : ''}>
          <input type="checkbox" defaultChecked={task.is_completed} />
          <span>{task.title}</span>
        </li>
      ))}
    </ul>
  );
};