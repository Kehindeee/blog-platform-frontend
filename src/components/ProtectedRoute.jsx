// Desc: Private route component that checks if user is logged in and if user is an admin
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// ProtectedRoute component
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth();

  if (!user) {
    // User not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !user.isAdmin) {
    // User is not an admin, redirect to home or another page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
