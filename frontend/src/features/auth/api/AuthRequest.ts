import axios from "../../../utils/axios";
import type {
  AdminRegisterType,
  PublicRegisterType,
} from "../schema/RegisterSchema";
import type {
  admincRegisterType,
  RegisterSuccessResponse,
  UserType,
} from "../../../types/UserTypes";
import type { LoginUserType } from "../schema/LoginSchema";
import { AxiosError } from "axios";

export const publicRegisterRequest = async (
  data: PublicRegisterType
): Promise<RegisterSuccessResponse> => {
  try {
    const res = await axios.post<RegisterSuccessResponse>("/register", data);
    return res.data;
  } catch (error) {
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
    const res = await axios.post<admincRegisterType>("/admin/register", data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al registrar el nuevo empleado.");
  }
};

export const loginRequest = async (
  data: LoginUserType
): Promise<RegisterSuccessResponse> => {
  try {
    const res = await axios.post<RegisterSuccessResponse>("/login", data);
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage =
        error.response.data?.message || "Error desconocido";
      throw new Error(backendMessage);
    }

    throw new Error("Error desconocido al iniciar sesión.");
  }
};

export const logoutRequest = async () => {

  try {
    const response = await axios.post("/logout");
    return response.data;
  } catch (error) {

    if (error instanceof Error) {
      throw new Error("No autorizado. Inicia sesión.");
    }
    throw new Error("Error en el servidor");
  }
};

export const getCurrentUserRequest = async (): Promise<UserType> => {
  try {
    const response = await axios.get("/");
    return response.data;
  } catch (error) {
    console.log(error);

    if (error instanceof Error) {
      throw new Error("No autorizado. Inicia sesión.");
    }
    throw new Error("Error en el servidor");
  }
};
