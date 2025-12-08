import React from "react";
import { useNavigate } from "react-router-dom";
import "./settingsPage.css";

const SettingsPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="coming-soon-card">
        <span role="img" aria-label="gear">⚙️</span>
        <h2>Coming Soon!</h2>
        <p>More settings options will be available in future updates. Stay tuned! 🎉</p>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default SettingsPage;