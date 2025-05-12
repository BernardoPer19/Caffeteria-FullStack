import axios from "@/utils/axios";
import { AxiosError } from "axios";

export const getProductsRequest = async () => {
  try {
    const response = await axios.get("/products");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al registrar el usuario.");
  }
};
