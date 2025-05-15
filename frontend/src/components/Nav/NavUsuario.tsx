import { NavLink } from "react-router-dom";

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
      <NavLink
        to="/ordenes"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Órdenes
      </NavLink>
      <NavLink
        to="/cafes"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Cafés
      </NavLink>

      
    </>
  );
}
