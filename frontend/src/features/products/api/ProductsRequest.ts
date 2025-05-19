import axios from "../../../utils/axios";
import { AxiosError } from "axios";
import type { ProductTypes } from "../types/ProductsType";

export const getProductsRequest = async (): Promise<ProductTypes[]> => {
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

// Crear producto
export const createProductRequest = async (product: ProductTypes) => {
  try {
    const response = await axios.post("/products", product);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al obtener productos.");
  }
};

// Actualizar producto
export const updateProductRequest = async (
  id: number,
  updates: Partial<ProductTypes>
) => {
  try {
    const response = await axios.put(`/products/${id}`, updates);
    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al obtener productos.");
  }
};

// Eliminar producto
export const deleteProductRequest = async (id: number) => {
  try {
    const response = await axios.delete(`/products/${id}`);
    return response.data.message;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al obtener productos.");
  }
};
