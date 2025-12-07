import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
//function to check if we have a token
const useAuth = () => {
  const token = localStorage.getItem('token');
  return token ? true : false;
};

const ProtectedRoute = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;