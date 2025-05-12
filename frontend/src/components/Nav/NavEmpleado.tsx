import { NavLink } from "react-router-dom";

export function NavEmpleado() {
  return (
    <NavLink
      to="/dashboard-empleado"
      className="hover:text-[#a67c52] transition"
    >
      Dashboard
    </NavLink>
  );
}
