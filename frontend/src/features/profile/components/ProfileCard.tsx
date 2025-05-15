import { useAuthContext } from "../../auth/context/AuthContext";
import { Mail, CalendarDays, ShieldCheck } from "lucide-react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import localeEs from "dayjs/locale/es"; // para español
function ProfileComponent() {
  const { user } = useAuthContext();

  if (!user) {
    return (
      <p className="text-center mt-20 text-gray-500">Cargando perfil...</p>
    );
  }
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.locale(localeEs);
  const fechaFormateada = dayjs(user.fechaCreacion)
    .tz("America/La_Paz")
    .format("D [de] MMMM [de] YYYY, h:mm A");

  return (
    <section className="min-h-screen bg-[#fdf8f3] flex justify-center items-center px-4 py-10">
      <div className="bg-white shadow-xl rounded-3xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row border border-[#e7d7c9]">
        {/* Sidebar con imagen */}
        <div className="bg-[#f3ebe4] md:w-1/3 flex flex-col items-center justify-center p-8 text-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/020/911/740/non_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"
            alt="Foto de perfil"
            className="w-32 h-32 rounded-full border-4 border-[#a9714b] shadow-lg object-cover"
          />
          <h2 className="mt-4 text-2xl font-semibold text-[#4b2e1e]">
            {user.nombre}
          </h2>
          <p className="text-[#a5795e] text-sm mt-1 italic">{user.rol}</p>
        </div>

        {/* Datos del usuario */}
        <div className="flex-1 p-8 space-y-6 text-[#4b2e1e]">
          <h3 className="text-xl font-bold border-b pb-2 border-[#e4c9b3]">
            Información de la cuenta
          </h3>

          <div className="flex items-center gap-4">
            <Mail className="h-5 w-5 text-[#b5794b]" />
            <p className="font-medium">{user.email}</p>
          </div>

          <div className="flex items-center gap-4">
            <CalendarDays className="h-5 w-5 text-[#b5794b]" />
            <p className="font-medium">
              Registrado el :<span className="italic"> {fechaFormateada}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck className="h-5 w-5 text-[#b5794b]" />
            <p className="font-medium capitalize">Rol: {user.rol}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProfileComponent;