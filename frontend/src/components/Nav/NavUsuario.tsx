import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export function NavCliente() {
  return (
    <>
      <NavLink to="/reservas" className="hover:text-[#a67c52] transition">
        Reservas
      </NavLink>
      <NavLink to="/ordenes" className="hover:text-[#a67c52] transition">
        Órdenes
      </NavLink>
      <NavLink to="/cafes" className="hover:text-[#a67c52] transition">
        Cafés
      </NavLink>
      <div className="relative cursor-pointer">
        <ShoppingCart className="w-6 h-6 hover:text-[#a67c52] transition" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          3
        </span>
      </div>
    </>
  );
}
