// src/features/products/context/ProductsFilter.tsx

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductTypes } from "../types/ProductsType";
import { useProducts } from "../hooks/useFetchData";

type ProductsFilter = {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
};

type ProductsFilterContextType = {
  filters: ProductsFilter;
  setFilters: (filters: ProductsFilter) => void;
  updateFilter: (key: keyof ProductsFilter, value: string | number) => void;
  filteredProducts: ProductTypes[];
  allProducts: ProductTypes[] | undefined;
  isLoading: boolean;
  isError: boolean;
  resetFilters: () => void;
};

const defaultFilters: ProductsFilter = {
  search: "",
  category: "",
  minPrice: 0,
  maxPrice: 0,
};

const ProductsFilterContext = createContext<
  ProductsFilterContextType | undefined
>(undefined);

export const ProductsFilterProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [filters, setFilters] = useState<ProductsFilter>(defaultFilters);

  const resetFilters = () => setFilters(defaultFilters);

  const updateFilter = (key: keyof ProductsFilter, value: string | number) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const { products: allProducts = [], isLoading, isError } = useProducts();

  const filteredProducts = useMemo(() => {
    if (!allProducts) return [];

    return allProducts.filter((p) => {
      const matchSearch = p.nombre
        .toLowerCase()
        .includes(filters.search.toLowerCase());
      const matchCategory =
        filters.category === "" || p.categoria === filters.category;
      const matchMin = filters.minPrice === 0 || p.precio >= filters.minPrice;
      const matchMax = filters.maxPrice === 0 || p.precio <= filters.maxPrice;
      return matchSearch && matchCategory && matchMin && matchMax;
    });
  }, [allProducts, filters]);

  return (
    <ProductsFilterContext.Provider
      value={{
        filters,
        setFilters,
        updateFilter,
        filteredProducts,
        allProducts,
        isLoading,
        isError,
        resetFilters,
      }}
    >
      {children}
    </ProductsFilterContext.Provider>
  );
};

export const useProductsFilter = () => {
  const context = useContext(ProductsFilterContext);
  if (!context) {
    throw new Error(
      "useProductsFilter must be used within a ProductsFilterProvider"
    );
  }
  return context;
};
