import { NavLink } from "react-router-dom";

export function NavAdmin() {
  return (
    <>
      <NavLink to="/admin/usuarios" className="hover:text-[#a67c52] transition">
        Usuarios
      </NavLink>
      <NavLink
        to="/admin/estadisticas"
        className="hover:text-[#a67c52] transition"
      >
        Estadísticas
      </NavLink>
    </>
  );
}
