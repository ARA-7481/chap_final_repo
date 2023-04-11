import { useLocation, Navigate, Outlet } from "react-router-dom";
import React from "react";
import { useSelector } from 'react-redux';

function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = getAuth();
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

function getAuth() {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return isAuthenticated;
  }

export default RequireAuth;