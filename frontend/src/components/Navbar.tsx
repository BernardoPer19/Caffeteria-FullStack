import { NavLink } from "react-router-dom";
import { NavGuest } from "./Nav/NavGuest";
import { NavEmpleado } from "./Nav/NavEmpleado";
import { NavAdmin } from "./Nav/NavAdmin";
import { NavAuthActions } from "./Nav/NavAuthActions";
import { useAuthContext } from "../features/auth/context/AuthContext";

export function Navbar() {
  const { isAuthenticated, user } = useAuthContext();

  const isCliente = user?.rol === "usuario";
  const isEmpleado = user?.rol === "empleado";
  const isAdmin = user?.rol === "admin";

  return (
    <header className="bg-[#f6f1eb] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink
          to="/"
          className="text-[#5c4033] text-2xl font-bold tracking-wide"
        >
          CaféDelicias
        </NavLink>

        <nav className="flex items-center space-x-6 text-[#5c4033] font-medium">
          <NavGuest />  

          {isCliente && <NavGuest />}
          {isEmpleado && <NavEmpleado />}
          {isAdmin && <NavAdmin />}

          <NavAuthActions isAuthenticated={isAuthenticated} />
        </nav>
      </div>
    </header>
  );
}
