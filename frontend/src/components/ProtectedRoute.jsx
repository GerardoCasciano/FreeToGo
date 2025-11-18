import { Children } from "react";
import { isAuthenticated } from "../api/authService";
import { Navigate } from "react-router-dom";

const ProtectedRpoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};
export default ProtectedRpoute;
