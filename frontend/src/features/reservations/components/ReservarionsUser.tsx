import { Toaster } from "sonner";
import { useReservations } from "../hooks/useReservations";

function ReservarionsUser() {
  const { getData } = useReservations();

  return (
    <main className="p-4 sm:p-8 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Tus Reservas
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Toaster />
        {getData.reservations?.map((reserva) => (
          <div
            key={reserva.reserva_id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="mb-4">
              <span className="text-xl text-gray-500">Plan reservado:</span>
              <h2 className="text-lg font-semibold text-indigo-600">
                {reserva.plan}
              </h2>
            </div>

            <div className="flex flex-col gap-2 text-sm text-gray-700">
              <p>
                <span className="font-medium text-gray-600">Inicio:</span>{" "}
                {reserva.fecha_inicio}
              </p>
              <p>
                <span className="font-medium text-gray-600">Fin:</span>{" "}
                {reserva.fecha_fin}
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
