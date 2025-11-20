import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { goalSchema } from "../../validation/goalSchema";
import "./GoalForm.css";

export const GoalForm = () => {
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(goalSchema),
  });

  const onSubmit = async (data) => {
    setServerError("");
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {

        const errorData = await response.json();
        throw new Error(
          errorData.message || "Something went wrong. Please try again."
        );
      }
      const responseData = await response.json();
      console.log("Form submitted successfully! Data sent:", data);
      console.log("Data received from server:", responseData);
      alert("Goal saved successfully! Check the browser console for details.");
    } catch (error) {
      setServerError(error.message);
    }
  };

  return (
    <div className="form-container">
      <h1>Create a New SMART Goal</h1>

      {serverError && (
        <p className="error-message server-error">{serverError}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>

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
