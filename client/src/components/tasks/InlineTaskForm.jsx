import React, { useState, useEffect, useRef } from "react";
import "./InlineTaskForm.css";
export const AddTaskForm = ({ onSave }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  // Auto-focus on input field when user click add task and field is rendered
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    onSave({ title });
  };

  return (
    <form className="task-inline-form" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="New task title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {error && <p className="form-error">{error}</p>}

      <div className="add-task-actions">
        <button type="submit" className="btn-save-task">
          Save
        </button>
      </div>
    </form>
  );
};
