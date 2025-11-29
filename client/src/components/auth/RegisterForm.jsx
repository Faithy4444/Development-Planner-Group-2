import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../validation/authSchema';
import './AuthForms.css';

export const RegisterForm = () => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const onSubmit = async (data) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    try {
      const response = await fetch(`${apiUrl}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.msg || 'Registration failed. Please try again.');
      }
      alert('Registration successful! You can now log in.');
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };
  return (
    <div className="auth-form-container">
      <h2>Create Your Account</h2>
      <p className="form-subtitle">Start planning your future today.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input 
            id="fullName" 
            type="text" 
            placeholder="e.g., Jane Doe" 
            {...register('fullName')} 
          />
          {errors.fullName && <p className="error-message">{errors.fullName.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            placeholder="e.g., jane.doe@example.com" 
            {...register('email')} 
          />
          {errors.email && <p className="error-message">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            placeholder="Minimum 8 characters" 
            {...register('password')} 
          />
          {errors.password && <p className="error-message">{errors.password.message}</p>}
        </div>
        <button type="submit" className="btn-primary auth-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};