import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  //logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // no token → do not fetch

      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
        //'/me' endpoint.
        const response = await fetch(`${apiUrl}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData); //Saving the fetched user data into state
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        handleLogout();
      }
    };

    fetchUserData();
  }, []);

  return (
    <nav className="navbar">
      <Link to="/dashboard" className="navbar-brand">
        <span className="navbar-brand-pink">Plan</span>YourFuture
      </Link>
      <div className="navbar-user">
        {user ? (
          <>
            <span className="welcome-text">Welcome, </span>
            <span className="user-name">{user.username}!</span>
            <button onClick={handleLogout} className="btn-logout">
              Log Out
            </button>
          </>
        ) : (
          <span className="welcome-text">Loading...</span>
        )}
      </div>
    </nav>
  );
};
