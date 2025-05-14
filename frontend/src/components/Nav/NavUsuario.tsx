import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

interface Props {
  mobile?: boolean;
}

export function NavCliente({ mobile }: Props) {
  const linkClass = mobile
    ? "block py-1 text-sm"
    : "hover:text-[#a67c52] transition";
  return (
    <>
      <NavLink
        to="/reservas"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Reservas
      </NavLink>
      {/* <NavLink
        to="/ordenes"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Órdenes
      </NavLink> */}

      <NavLink
        to="/perfil"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Perfil
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
