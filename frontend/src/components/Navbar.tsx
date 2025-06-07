import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, ShoppingCart, X } from "lucide-react";
import { NavGuest } from "./Nav/NavGuest";
import { NavEmpleado } from "./Nav/NavEmpleado";
import { NavAdmin } from "./Nav/NavAdmin";
import { NavAuthActions } from "./Nav/NavAuthActions";
import { useAuthContext } from "../features/auth/context/AuthContext";
import { NavCliente } from "./Nav/NavUsuario";
import { useCart } from "../features/products/context/CartContext";

export function Navbar() {
  const { items, toggleCart } = useCart();
  const { isAuthenticated, user } = useAuthContext();
  console.log(isAuthenticated);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isCliente = user?.rol === "usuario";
  const isEmpleado = user?.rol === "empleado";
  const isAdmin = user?.rol === "admin";

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="bg-[#f6f1eb] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink
          to="/"
          className="text-[#5c4033] text-2xl font-bold tracking-wide"
        >
          Toc Toc Cafe Gourmet
        </NavLink>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden text-[#5c4033]"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Menú principal (desktop) */}
        <nav className="hidden md:flex items-center space-x-6 text-[#5c4033] font-medium">
          {isCliente && (
            <>
              <NavGuest />
              <NavCliente />
            </>
          )}
          {!isAuthenticated && <NavGuest />}
          {isEmpleado && <NavEmpleado />}
          {isAdmin && (
            <>
              <NavGuest />
              <NavAdmin />
            </>
          )}
          <NavAuthActions isAuthenticated={isAuthenticated} />

          <div className="relative cursor-pointer" onClick={toggleCart}>
            <ShoppingCart className="w-6 h-6 hover:text-[#a67c52] transition" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
          </div>
        </nav>
      </div>

      {/* Menú lateral (mobile) */}
      {isMenuOpen && (
        <div
          className="fixed top-[60px] right-0 w-[60%] h-[50dvh] bg-[#f6f1eb] shadow-lg z-40 flex flex-col px-6 py-4 space-y-4 text-[#5c4033] font-medium rounded-bl-2xl transition-all duration-300
        "
        >
          {isCliente && (
            <>
              <NavGuest mobile />
              <NavCliente mobile />
            </>
          )}
          {!isAuthenticated && <NavGuest mobile />}
          {isEmpleado && <NavEmpleado mobile />}
          {isAdmin && <NavAdmin mobile />}
          <NavAuthActions isAuthenticated={isAuthenticated} mobile />
        </div>
      )}
    </header>
  );
}
