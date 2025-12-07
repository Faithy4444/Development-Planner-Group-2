import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../validation/authSchema";
import "./AuthForms.css";
import { useFetch } from "../../useFetch";

export const RegisterForm = () => {
  const { executeFetch, loading } = useFetch();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      // This onSubmit logic is correct as it sends the data object.
      const response = await executeFetch("/api/users/register", "POST", data);

      if (!response.msg) {
        const errorData = response;
        throw new Error(errorData || "Registration failed.");
      }
      alert("Registration successful! You can now log in.");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };
  if (loading) return <p>Loading...</p>;
  return (
    <div className="auth-form-container">
      <h2>Create Your Account</h2>
      <p className="form-subtitle">Start planning your future today.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          {/* CRITICAL FIX: Changed label and placeholder to 'Username' */}
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="e.g., janedoe"
            {...register("username")} // This was already correct
          />
          {/* CRITICAL FIX: Changed error check to 'username' */}
          {errors.username && (
            <p className="error-message">{errors.username.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="e.g., jane.doe@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Minimum 8 characters"
            {...register("password")}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn-primary auth-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>
    </div>
  );
};
