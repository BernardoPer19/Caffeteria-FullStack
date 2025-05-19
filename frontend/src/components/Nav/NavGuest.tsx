
import { NavLink } from "react-router-dom";

interface Props {
  mobile?: boolean;
}

export function NavGuest({ mobile }: Props) {
  const linkClass = mobile
    ? "block py-1 text-sm"
    : "hover:text-[#a67c52] transition";
  return (
    <>
      <NavLink
        to="/"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Inicio
      </NavLink>

      <NavLink
        to="/products"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Productos
      </NavLink>


    </>
  );
}
