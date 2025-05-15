import { NavLink } from "react-router-dom";

interface Props {
  mobile?: boolean;
}

export function NavEmpleado({ mobile }: Props) {
  const linkClass = mobile
    ? "block py-1 text-sm"
    : "hover:text-[#a67c52] transition";

  return (
    <NavLink
      to="/dashboard-empleado"
      className={`hover:text-[#a67c52] transition ${linkClass}`}
    >
      Dashboard
    </NavLink>
  );
}
