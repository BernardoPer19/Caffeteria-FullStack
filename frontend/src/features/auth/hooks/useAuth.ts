import { useMutation } from "@tanstack/react-query";
import { loginRequest, publicRegisterRequest } from "../api/AuthRequest";
import { toast } from "sonner";

export const useAuthForm = () => {
  const handleSuccess = (message: string, bienvenida?: string) => {
    toast.success(message);
    if (bienvenida) console.log(bienvenida);
  };

  const handleError = (context: string, error: any) => {
    console.error(`❌ Error en ${context}:`, error);

    const message =
      error?.response?.data?.message || error?.message || "Error desconocido";

    toast.error(message);
  };

  const {
    mutate: loginMutate,
    isPending: isLoginPending,
    isError: isLoginError,
    error: loginError,
    reset: resetLogin,
  } = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      handleSuccess(data.message, data.bienvenida);
    },
    onError: (error) => {
      handleError("inicio de sesión", error);
    },
  });

  const {
    mutate: registerMutate,
    isPending: isRegisterPending,
    isError: isRegisterError,
    error: registerError,
    reset: resetRegister,
  } = useMutation({
    mutationFn: publicRegisterRequest,
    onSuccess: (data) => {
      handleSuccess(data.message, data.bienvenida);
    },
    onError: (error) => {
      handleError("registro", error);
    },
  });

  return {
    login: {
      loginMutate,
      isLoginPending,
      isLoginError,
      loginError,
      resetLogin,
    },
    register: {
      registerMutate,
      isRegisterPending,
      isRegisterError,
      registerError,
      resetRegister,
    },
  };
};
