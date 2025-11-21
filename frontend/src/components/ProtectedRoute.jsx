import { isAuthenticated } from "../api/authService";
import { Navigate } from "react-router-dom";

const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    const user = JSON.parse(userStr);
    const roles = user.ruoli ? user.ruoli.split(",") : [];
    return { ...user, roles };
  }
  return null;
};
const ProtectedRoute = ({ children, isAdmin }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/logoin" />;
  }
  if (isAdmin) {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.roles.includes("ADMIN")) {
      return <Navigate to="/" />;
    }
  }
  return children;
};

export default ProtectedRoute;
