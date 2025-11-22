import React from 'react';
import './AuthForms.css';

export const LoginForm = () => {
  return ( 
    <div className="auth-form-container">
      <h2>Welcome Back!</h2>
      <p className="form-subtitle">Log in to access your dashboard.</p>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="e.g., jane.doe@example.com" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" />
        </div>
        <button type="submit" className="btn-primary auth-btn">Log In</button>
      </form>
    </div>
  );
};
