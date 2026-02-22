import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      // No token → not logged in
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

        const response = await fetch(`${apiUrl}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        handleLogout();
      } finally {
        setIsLoading(false);
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
        {/* Loading state */}
        {isLoading && <span className="welcome-text">Loading...</span>}

        {/* Logged in */}
        {!isLoading && user && (
          <>
            <span className="welcome-text">Welcome, </span>
            <span className="user-name">{user.username}!</span>
            <button onClick={handleLogout} className="btn-logout">
              Log Out
            </button>
          </>
        )}

        {/* Not logged in */}
        {!isLoading && !user && (
          <button onClick={() => navigate("/login")} className="btn-login">
            Log In
          </button>
        )}
      </div>
    </nav>
  );
};
