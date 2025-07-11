// src/adminPanel/AdminRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const ALLOWED_EMAILS = [
  "rautyashsubodhuma@gmail.com",
  "kushdastane69211@gmail.com",
];

const AdminRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Loading...</p>;
  if (!user || !ALLOWED_EMAILS.includes(user.email)) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default AdminRoute;
