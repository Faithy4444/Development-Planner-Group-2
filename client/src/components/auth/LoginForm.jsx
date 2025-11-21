// import React from 'react';
// import './AuthForms.css';

// export const LoginForm = () => {
//   return ( 
//     <div className="auth-form-container">
//       <h2>Welcome Back!</h2>
//       <p className="form-subtitle">Log in to access your dashboard.</p>
//       <form>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input id="email" type="email" placeholder="e.g., jane.doe@example.com" />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input id="password" type="password" />
//         </div>
//         <button type="submit" className="btn-primary auth-btn">Log In</button>
//       </form>
//     </div>
//   );
// };
//Mock Code for the login
// src/components/auth/LoginForm.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. IMPORT useNavigate
import './AuthForms.css';

export const LoginForm = () => {
  const navigate = useNavigate(); // <-- 2. INITIALIZE the hook

  const handleMockLogin = (event) => {
    event.preventDefault(); // Prevent the form from actually submitting/reloading
    console.log("Simulating successful login...");
    navigate('/dashboard'); // <-- 3. REDIRECT to the dashboard
  };

  return (
    <div className="auth-form-container">
      <h2>Welcome Back!</h2>
      <p className="form-subtitle">Log in to access your dashboard.</p>
      {/* 4. ADD the onSubmit handler to the form */}
      <form onSubmit={handleMockLogin}>
        {/* ... (your input fields are the same) ... */}
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