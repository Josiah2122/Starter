import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // const userData = localStorage.getItem("userData");

  // if (!userData) {
  //   return <Navigate to="/login" />;
  // }

  return children;
}
