import { Toaster } from "sonner";
import { useReservations } from "../hooks/useReservations";
import dayjs from "dayjs";
import "dayjs/locale/es";
dayjs.locale("es");

function ReservarionsUser() {
  const { getData } = useReservations();
  const { reservations, isFetchingReservations, fetchError } = getData;

  if (isFetchingReservations) {
    return <p className="p-4">Cargando reservas...</p>;
  }

  if (fetchError) {
    return (
      <p className="p-4 text-red-600">
        Error al cargar reservas: {fetchError.message}
      </p>
    );
  }

  return (
    <main className="p-4 sm:p-8 min-h-screen">
      <Toaster />
      <h1 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        🗓️ Tus Reservas
      </h1>

      {reservations && reservations.length === 0 && (
        <p className="text-gray-500">No tienes reservas registradas 💤</p>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {reservations?.map((reserva) => (
          <div
            key={reserva.reserva_id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <p>
                <span className="font-medium text-gray-600">Inicio:</span>{" "}
                {dayjs(reserva.fecha_inicio).format("D [de] MMMM YYYY")}
              </p>
              <p>
                <span className="font-medium text-gray-600">Fin:</span>{" "}
                {dayjs(reserva.fecha_fin).format("D [de] MMMM YYYY")}
              </p>
              <p>
                <span className="font-medium text-gray-600">Hora cita:</span>{" "}
                {reserva.hora_cita}
              </p>
              <p>
                <span className="font-medium text-gray-600">Estado:</span>{" "}
                <span
                  className={`inline-block px-2 py-1 rounded text-white text-xs font-semibold
                    ${reserva.estado === "pendiente" && "bg-yellow-500"}
                    ${reserva.estado === "aceptada" && "bg-green-600"}
                    ${reserva.estado === "rechazada" && "bg-red-500"}`}
                >
                  {reserva.estado}
                </span>
              </p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

export default ReservarionsUser;
