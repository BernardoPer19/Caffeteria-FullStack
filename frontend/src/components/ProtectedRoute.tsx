import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../features/auth/context/AuthContext";
import type { Roles } from "@/types/UserTypes";

interface Props {
  allowedRoles: Roles[];
}

export function ProtectedRoute({ allowedRoles }: Props) {
  const { isAuthenticated, user } = useAuthContext();

  if (!isAuthenticated || !user || !user.rol) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.rol)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
