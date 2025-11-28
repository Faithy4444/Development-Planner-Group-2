import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { goalSchema } from "../../validation/goalSchema";
import "./GoalForm.css";
import { useFetch } from "../../useFetch";
import { useNavigate } from "react-router-dom";

export const GoalForm = () => {
  const { executeFetch, loading, error } = useFetch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(goalSchema),
  });

  const onSubmit = async (data) => {
    const dataWithUser = { ...data, user_id: 6 }; //insert user id to simulate user
    const responseData = await executeFetch("/api/goals", "POST", dataWithUser);
    console.log("Form submitted successfully! Data sent:", dataWithUser);
    console.log("Data received from server:", responseData);
    navigate("/dashboard");
  };
  if (loading) return <p>Saving...</p>;
  if (error) return <p>Error uploading {error}</p>;
  return (
    <div className="form-container">
      <h1>Create a New SMART Goal</h1>

      {error && <p className="error-message server-error">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="title">Goal title</label>
          <p className="helper-text">What's your goal?</p>
          <textarea
            id="title"
            rows="3"
            className={errors.title ? "input-error" : ""}
            disabled={isSubmitting}
            {...register("title")}
          />
          {errors.title && (
            <p className="error-message">{errors.title.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="specific">Specific</label>
          <p className="helper-text">What exactly do you want to achieve?</p>
          <textarea
            id="specific"
            rows="3"
            className={errors.specific ? "input-error" : ""}
            disabled={isSubmitting}
            {...register("specific")}
          />
          {errors.specific && (
            <p className="error-message">{errors.specific.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="measurable">Measurable</label>
          <p className="helper-text">
            How will you know when you've achieved it?
          </p>
          <textarea
            id="measurable"
            rows="3"
            disabled={isSubmitting}
            {...register("measurable")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="achievable">Achievable</label>
          <p className="helper-text">What steps will you take to achieve it?</p>
          <textarea
            id="achievable"
            rows="3"
            disabled={isSubmitting}
            {...register("achievable")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="relevant">Relevant</label>
          <p className="helper-text">Why does this goal matter to you?</p>
          <textarea
            id="relevant"
            rows="3"
            disabled={isSubmitting}
            {...register("relevant")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time_bound">Time-Bound</label>
          <p className="helper-text">When will you achieve this by?</p>
          <input
            id="time_bound"
            type="date"
            className={errors.time_bound ? "input-error" : ""}
            disabled={isSubmitting}
            {...register("time_bound", { valueAsDate: true })}
          />
          {errors.time_bound && (
            <p className="error-message">{errors.time_bound.message}</p>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Goal"}
          </button>
        </div>
      </form>
    </div>
  );
};
