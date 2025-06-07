import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { UserType } from "../../../types/UserTypes";
import { getCurrentUserRequest, logoutRequest } from "../api/AuthRequest";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

// Contexto tipado
interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const {
    data: user,
    isLoading: isAuthLoading,
    // error,
  } = useQuery<UserType, AxiosError>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserRequest,
    retry: false,
    refetchOnWindowFocus: true, // 🔁 esto ayuda
  });

  const logout = async () => {
    try {
      await logoutRequest();

      await queryClient.cancelQueries({ queryKey: ["currentUser"] }); // Cancela peticiones pendientes
      queryClient.setQueryData(["currentUser"], null); // Limpia cache
      await queryClient.refetchQueries({ queryKey: ["currentUser"] }); // Forza revalidación

      setIsAuthenticated(false);
      navigate("/login");
      toast.success("¡Sesión cerrada exitosamente!");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Error al cerrar sesión.");
    }
  };

  useEffect(() => {
    console.log("👤 Estado del usuario tras cambio:", user);
    setIsAuthenticated(!isAuthLoading && !!user);
  }, [user, isAuthLoading]);

  // if (error) {
  //   console.error("❌ Error al obtener el usuario:", error.message);
  // }

  return (
    <AuthContext.Provider
      value={{ user: user ?? null, isAuthenticated, isAuthLoading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
