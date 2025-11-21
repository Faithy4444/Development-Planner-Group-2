import React from 'react';
import { Outlet } from 'react-router-dom'; // <-- IMPORTANT
import { Navbar } from './Navbar';
import './MainLayout.css';

export const MainLayout = () => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};