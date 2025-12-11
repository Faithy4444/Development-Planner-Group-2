import React from "react";
import { Link, Outlet } from "react-router-dom"; // <-- IMPORTANT
import { Navbar } from "./Navbar";
import "./MainLayout.css";

export const MainLayout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <div className="layout-body">
        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Planner</h2>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
            </ul>
            {/* GitHub link anchored at bottom */}
            <a
              href="https://github.com/Faithy4444/Development-Planner-Group-2"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              Project on GitHub
            </a>
          </nav>
        </aside>

        {/* Page content */}
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
