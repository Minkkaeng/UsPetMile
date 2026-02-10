import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../../services/authService";

export default function ProtectedRoute() {
  const isLoggedIn = authService.isLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
