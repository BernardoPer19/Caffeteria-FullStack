import axios from "../../../utils/axios";
import { AxiosError } from "axios";
import type { ProductTypes } from "../types/ProductsType";

export const getProductsRequest = async (): 
Promise<ProductTypes[]> => {
  try {
    const response = await axios.get<{ data: ProductTypes[] }>("/products");
    
    return response.data.data; 
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al obtener productos.");
  }
};
