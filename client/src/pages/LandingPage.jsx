import React, { useState } from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { RegisterForm } from '../components/auth/RegisterForm';
import './LandingPage.css';

const LandingPage = () => {
  const [activeForm, setActiveForm] = useState('register');

  return (
    <div className="landing-container">
      <div className="hero-panel">
        <div className="hero-content">
          <h1 className="hero-headline">
  <span className="hero-headline-pink">Plan</span> Your Future,
  <span className="hero-headline-secondary">Launch Your Career.</span>
</h1> 
          <p className="hero-subheadline">
            The essential development planner for CodeYourFuture graduates. 
            Set SMART goals, track your progress, and get feedback from mentors to land your first role in tech.
          </p>
        </div>
      </div>
      <div className="form-panel">
        <div className="form-content-wrapper">
          <div className="form-toggle">
            <button 
              className={`toggle-btn ${activeForm === 'register' ? 'active' : ''}`}
              onClick={() => setActiveForm('register')}
            >
              Register
            </button>
            <button
              className={`toggle-btn ${activeForm === 'login' ? 'active' : ''}`}
              onClick={() => setActiveForm('login')}
            >
              Log In
            </button>
          </div>

          {activeForm === 'register' ? <RegisterForm /> : <LoginForm />}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;