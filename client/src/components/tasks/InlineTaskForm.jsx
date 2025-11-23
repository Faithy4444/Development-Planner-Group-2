import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema } from "../../validation/taskSchema";
import "./InlineTaskForm.css";

export const AddTaskForm = ({ onSave }) => {
  //validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: { title: "" },
  });

  // Auto-focus when the form appears
  useEffect(() => {
    setFocus("title");
  }, [setFocus]);

  const onSubmit = async (title) => {
    await onSave(title);
  };

  return (
    <form className="task-inline-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        id="inlineTaskTitle"
        type="text"
        placeholder="New task title..."
        {...register("title")}
      />

      {errors.title && <p className="form-error">{errors.title.message}</p>}

      <div className="add-task-actions">
        <button type="submit" className="btn-save-task">
          Save
        </button>
      </div>
    </form>
  );
};
