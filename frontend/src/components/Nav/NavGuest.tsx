import { NavLink } from "react-router-dom";

export function NavGuest() {
  return (
    <>
      <NavLink to="/" className="hover:text-[#a67c52] transition">
        Inicio
      </NavLink>
      <NavLink to="/sobre-nosotros" className="hover:text-[#a67c52] transition">
        Sobre Nosotros
      </NavLink>
    </>
  );
}
