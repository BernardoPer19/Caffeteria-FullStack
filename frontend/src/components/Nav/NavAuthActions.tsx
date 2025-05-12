import { useAuthContext } from "../../features/auth/context/AuthContext";
import { NavLink } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
}

export function NavAuthActions({ isAuthenticated }: Props) {
  const { logout } = useAuthContext();

  return isAuthenticated ? (
    <>
      <NavLink to="/perfil" className="hover:text-[#a67c52] transition">
        Perfil
      </NavLink>
      <button onClick={logout} className="hover:text-red-600 transition">
        Cerrar sesión
      </button>
    </>
  ) : (
    <>
      <NavLink to="/login" className="hover:text-[#a67c52] transition">
        Iniciar sesión
      </NavLink>
      <NavLink to="/register" className="hover:text-[#a67c52] transition">
        Registrarse
      </NavLink>
    </>
  );
}
