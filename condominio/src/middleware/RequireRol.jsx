import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth";

export default function RequireRole({ children, role }) {
  const user = getUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.roles || !user.roles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}