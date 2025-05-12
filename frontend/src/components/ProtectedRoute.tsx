import { useAuthContext } from "../features/auth/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  requiredRole?: "admin" | "empleado" | "cliente";
}

export function ProtectedRoute({ requiredRole }: Props) {
  const { isAuthenticated, user } = useAuthContext();
  console.log(isAuthenticated);

  if (!isAuthenticated && user?.rol == "admin")
    return <Navigate to="/login" replace />;

  if (requiredRole && user?.rol !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
