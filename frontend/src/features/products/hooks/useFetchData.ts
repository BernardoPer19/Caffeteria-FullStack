// src/hooks/useProducts.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProductsRequest,
  createProductRequest,
  deleteProductRequest,
} from "../api/ProductsRequest";
import type { ProductTypes } from "../types/ProductsType";

export const useProducts = () => {
  const queryClient = useQueryClient();

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ProductTypes[], Error>({
    queryKey: ["products"],
    queryFn: getProductsRequest,
    staleTime: 1000 * 60 * 5,
  });

  const createProduct = useMutation({
    mutationFn: createProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: deleteProductRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  return {
    products,
    isLoading,
    isError,
    error,
    refetch,
    createProduct,
    deleteProduct,
  };
};
