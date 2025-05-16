import { NavLink } from "react-router-dom";

interface Props {
  mobile?: boolean;
}

export function NavAdmin({ mobile }: Props) {
  const linkClass = mobile
    ? "block py-1 text-sm"
    : "hover:text-[#a67c52] transition";

  return (
    <>
      <NavLink
        to="/admin/usuarios"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Usuarios
      </NavLink>
      <NavLink
        to="/admin/estadisticas"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Estadísticas
      </NavLink>

      {/* <NavLink
        to="/admin/ordenes"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Ordenes
      </NavLink> */}

      <NavLink
        to="/admin/usuarios"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Usuarios
      </NavLink>

      <NavLink
        to="/admin/empleados"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Empleados
      </NavLink>

      <NavLink
        to="/admin/productos"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Productos
      </NavLink>
    </>
  );
}
