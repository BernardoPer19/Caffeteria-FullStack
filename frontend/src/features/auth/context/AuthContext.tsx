import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { UserType } from "../types/UserTypes";
import { getCurrentUserRequest } from "../api/AuthRequest";

// Contexto tipado
interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    data: user,
    isLoading: isAuthLoading,
    error,
  } = useQuery<UserType, AxiosError>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserRequest,
    retry: false,
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!isAuthLoading && !!user);
  }, [user, isAuthLoading]);

  if (error) {
    console.error("❌ Error al obtener el usuario:", error.message);
  }
  return (
    <AuthContext.Provider
      value={{ user: user ?? null, isAuthenticated, isAuthLoading }}
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
