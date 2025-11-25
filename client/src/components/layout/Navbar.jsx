import React from 'react';
import './Navbar.css';
export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand"><span className="navbar-brand-pink">Plan</span>YourFuture</div>
      <div className="navbar-user">
        <span className="welcome-text">Welcome, </span>
        <span className="user-name">Mikiyas!</span>
        <button className="btn-logout">Log Out</button>
      </div>
    </nav>
  );
};