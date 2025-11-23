
import React, { useState } from "react";

export const AddTaskForm = ({ onSave  }) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    onSave({ title });
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
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
