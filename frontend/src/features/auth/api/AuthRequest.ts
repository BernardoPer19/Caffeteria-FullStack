import axios from "./axios";
import type {
  AdminRegisterType,
  PublicRegisterType,
} from "../schema/RegisterSchema";
import type {
  admincRegisterType,
  LoginType,
  publicRegisterType,
  UserType,
} from "../types/UserTypes";
import type { LoginUserType } from "../schema/LoginSchema";
import { AxiosError } from "axios";

export const publicRegisterRequest = async (
  data: PublicRegisterType
): Promise<publicRegisterType> => {
  try {
    const res = await axios.post<publicRegisterType>("/register", data);
    return res.data;
  } catch (error) {
    console.log(error);
    
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al registrar el usuario.");
  }
};

export const adminRegister = async (
  data: AdminRegisterType
): Promise<admincRegisterType> => {
  try {
    const res = await axios.post<admincRegisterType>("/register-admin", data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al registrar el nuevo empleado.");
  }
};

export const login = async (data: LoginUserType): Promise<LoginType> => {
  try {
    const res = await axios.post("/login", data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.message || error.message;
      throw new Error(backendMessage);
    }

    throw new Error("Error desconocido al iniciar sesion.");
  }
};

export const logoutRequest = async () => {
  try {
    const response = await axios.get("/logout");
    return response.data;
  } catch (error) {
    console.log("Error en logout:", error);
  }
};

export const verifyUserRequest = async (): Promise<UserType> => {
  try {
    const response = await axios.get("/verify");
    return response.data.user;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("No autorizado. Inicia sesión.");
    }
    throw new Error("Error en el servidor");
  }
};
