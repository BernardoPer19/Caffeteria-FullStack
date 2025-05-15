import { useQuery } from "@tanstack/react-query";
import { getProductsRequest } from "../api/ProductsRequest";
import type { ProductTypes } from "../types/ProductsType";

export const useProducts = () => {
  const {
    data: productsData,
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery<ProductTypes[], Error>({
    queryKey: ["products"],
    queryFn: getProductsRequest,
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return {
    products: {
      productsData,
      error,
      isError,
      isLoading,
      refetch,
    },
  };
};
