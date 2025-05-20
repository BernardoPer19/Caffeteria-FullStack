import { useNavigate } from "react-router-dom";

function Reservations() {
  const navigate = useNavigate();

  const handleReservationClick = () => {
    navigate("/login");
    // Idealmente aquí deberías verificar si el usuario está autenticado:
    // if (isAuthenticated) navigate("/reservas"); else navigate("/login");
  };

  return (
    <main className="bg-[#ede2d4] min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-26p-8">
        <img
          className="w-[600px] rounded-xl "
          src="/image.png"
          alt="Reservas en la cafetería"
        />

        <div className=" text-center md:text-left">
          <h1 className="text-3xl font-bold text-[#6b3e26] mb-4">
            ¡Haz tu reserva en nuestra cafetería!
          </h1>
          <p className="text-[#4a2f1b] mb-6 text-xl">
            Para poder hacer una reserva necesitas iniciar sesión. Si ya tienes
            una cuenta, haz clic en el botón para continuar. Si ya estás
            autenticado, serás redirigido directamente a la sección de reservas.
          </p>

          <button
            onClick={handleReservationClick}
            className="bg-[#a0522d] hover:bg-[#8b4513] text-white px-6 py-2 rounded-full text-base font-medium transition"
          >
            Iniciar sesión para reservar
          </button>
        </div>
      </div>
    </main>
  );
}

export default Reservations;
