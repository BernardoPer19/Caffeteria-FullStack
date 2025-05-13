import { useAuthContext } from "../../features/auth/context/AuthContext";
import { NavLink } from "react-router-dom";

interface Props {
  isAuthenticated: boolean;
  mobile?: boolean;
}

export function NavAuthActions({ isAuthenticated, mobile }: Props) {
  const { logout } = useAuthContext();

  const linkClass = mobile
    ? "block py-1 text-sm"
    : "hover:text-[#a67c52] transition";

  return isAuthenticated ? (
    <>
      <div className="flex h-[50vh] justify-center items-end gap-10 md:h-auto md:items-start md:justify-start md:gap-0">
        <NavLink
          to="/perfil"
          className={`bg-[#724c25] px-5 py-2 rounded-xl text-white transition ${linkClass}`}
        >
          Perfil
        </NavLink>
        <button
          onClick={logout}
          className="bg-red-800 text-white rounded-xl transition py-2 px-2"
        >
          Cerrar sesión
        </button>
      </div>
    </>
  ) : (
    <>
      <NavLink
        to="/login"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Iniciar sesión
      </NavLink>
      <NavLink
        to="/register"
        className={`hover:text-[#a67c52] transition ${linkClass}`}
      >
        Registrarse
      </NavLink>
    </>
  );
}
