import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { ProductTypes } from "../types/ProductsType";

type CartItem = ProductTypes & { quantity: number };

type CartContextType = {
  items: CartItem[];
  addItem: (item: ProductTypes) => void;
  removeItem: (cafe_id: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  isCartOpen: boolean;
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
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cartItems");
    return stored ? JSON.parse(stored) : [];
  });

  // 💾 sincronizar carrito con localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, [items]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addItem = (product: ProductTypes) => {
    console.log("Añadiendo producto:", product.cafe_id);

    setItems((prev) => {
      const existing = prev.find((item) => item.cafe_id === product.cafe_id);
      if (existing) {
        console.log("Producto ya existe, sumando 1.");
        return prev.map((item) =>
          item.cafe_id === product.cafe_id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((i) => i.cafe_id !== Number(id)));
  };

  const clearCart = () => setItems([]);

  const toggleCart = () => setIsCartOpen((prev) => !prev);
  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, toggleCart, isCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
};
