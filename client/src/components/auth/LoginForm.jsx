import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../validation/authSchema";
import { useNavigate } from "react-router-dom";
import "./AuthForms.css";
import { useFetch } from "../../useFetch";

export const LoginForm = () => {
  const { executeFetch, loading } = useFetch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await executeFetch("/api/users/login", "POST", data);

      if (!response.token) {
        throw new Error(
          "Invalid credentials. Please check your email and password."
        );
      }

      const { token } = response;

      if (token) {
        //Save the token to the browser's local storage
        localStorage.setItem("token", token);

        //Redirect the user to their dashboard
        navigate("/dashboard");
      } else {
        throw new Error("Login failed: no token received.");
      }
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="auth-form-container">
      <h2>Welcome Back!</h2>
      <p className="form-subtitle">Log in to access your dashboard.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="btn-primary auth-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging In..." : "Log In"}
        </button>
      </form>
    </div>
  );
};
