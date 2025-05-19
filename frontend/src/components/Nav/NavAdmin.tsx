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
        to="/admin/empleados"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Empleados
      </NavLink>

      <NavLink
        to="/admin/reservas"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Reservas
      </NavLink>

      <NavLink
        to="/admin/productos"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Productos-Administracion
      </NavLink>
      <NavLink
        to="/admin/perfil"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Perfil
      </NavLink>
    </>
  );
}
