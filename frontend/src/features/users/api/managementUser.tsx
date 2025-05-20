import type { PUTUserType, Roles, UserType } from "@/types/UserTypes";
import axios from "../../../utils/axios";
import { AxiosError } from "axios";

type UsersApiResponse = {
  status: string;
  data: UserType[];
};

export const getRolRequest = async (rol: Roles): Promise<UserType[]> => {
  try {
    const response = await axios.get<UsersApiResponse>(
      `/admin/user-management?rol=${rol}`
    );

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al obtener los usuarios.");
  }
};

export const deleteRolRequest = async (id: number): Promise<UserType> => {
  try {
    const response = await axios.delete<UserType>(
      `/admin/user-management/${id}`
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al eliminar el usuario.");
  }
};



export const updatateDataUsersRequest = async (
  id: number,
  data: PUTUserType
): Promise<{ message: string }> => {
  try {
    const response = await axios.put<{
      status: string;
      data: { message: string };
    }>(`/admin/user-management/${id}`, data);

    return response.data.data; 
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;

    
      throw new Error(
        typeof backendMessage === "string"
          ? backendMessage
          : JSON.stringify(backendMessage, null, 2)
      );
    }

    throw new Error("Error desconocido al actualizar el usuario.");
  }
};
