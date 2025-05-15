import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { ProductTypes } from "../types/ProductsType";

type CartItem = ProductTypes & { quantity: number };

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) =>
      prev.some((i) => i.cafe_id === item.cafe_id)
        ? prev.map((i) =>
            i.cafe_id === item.cafe_id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          )
        : [...prev, item]
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.cafe_id !== Number(id)));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
