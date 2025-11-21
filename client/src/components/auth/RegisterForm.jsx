import React from 'react';
import './AuthForms.css';

export const RegisterForm = () => {
  return (
    <div className="auth-form-container">
      <h2>Create Your Account</h2>
      <p className="form-subtitle">Start planning your future today.</p>
      <form> 
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input id="fullName" type="text" placeholder="e.g., Jane Doe" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="e.g., jane.doe@example.com" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" placeholder="Minimum 8 characters" />
        </div>
        <button type="submit" className="btn-primary auth-btn">Create Account</button>
      </form>
    </div>
  );
};