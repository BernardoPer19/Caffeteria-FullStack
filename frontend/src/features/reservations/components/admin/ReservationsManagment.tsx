import { useState } from "react";
import type { Estado } from "../../types/ReservationsTypes";
import { useAdminReservations } from "../../hooks/useReservationAdmin";
import { EstadoVisual } from "../../utils/EstadoVisual";

export const AdminReservasTable = () => {
  const {
    getData: { reservationsAdmin, isFetchingReservationsAdmin },
    updateData: { updateEstadoReserva },
    deleteData: { deleteReserva },
  } = useAdminReservations();

  const [selectedEstados, setSelectedEstados] = useState<Record<number, Estado>>({});

  const handleEstadoChange = (id: number, nuevoEstado: Estado) => {
    setSelectedEstados((prev) => ({ ...prev, [id]: nuevoEstado }));
  };

  const confirmarCambioEstado = (id: number) => {
    const nuevoEstado = selectedEstados[id];
    if (nuevoEstado) {
      updateEstadoReserva({ id, estado: nuevoEstado });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta reserva?")) {
      deleteReserva(id);
    }
  };

  if (isFetchingReservationsAdmin) {
    return <p className="text-center text-lg mt-6">Cargando reservas...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 font-sans">
      <h2 className="text-3xl font-serif font-bold text-center text-[#6b4c3b] mb-8 tracking-wide">
        Panel de Reservas ☕
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border-separate border-spacing-y-3 bg-[#f9f6f2] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-[#d9b382] to-[#a9745b] text-white uppercase text-sm tracking-wide shadow-md">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Plan</th>
              <th className="py-3 px-6 text-left">Fecha Inicio</th>
              <th className="py-3 px-6 text-left">Fecha Fin</th>
              <th className="py-3 px-6 text-left">Hora</th>
              <th className="py-3 px-6 text-left">Estado Visual</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservationsAdmin?.length ? (
              reservationsAdmin.map((reserva) => (
                <tr
                  key={reserva.reserva_id}
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
                >
                  <td className="py-4 px-6 font-mono text-sm text-[#6b4c3b]">{reserva.reserva_id}</td>
                  <td className="py-4 px-6 font-semibold text-[#8b5e3c]">{reserva.plan ? reserva.plan : "Sin plan"}</td>
                  <td className="py-4 px-6">{new Date(reserva.fecha_inicio).toLocaleDateString()}</td>
                  <td className="py-4 px-6">{new Date(reserva.fecha_fin).toLocaleDateString()}</td>
                  <td className="py-4 px-6">{reserva.hora_cita}</td>
                  <td className="py-4 px-6">
                    <EstadoVisual estado={reserva.estado} />
                  </td>
                  <td className="py-4 px-6">
                    <select
                      className="border border-[#a9745b] rounded px-3 py-1 bg-[#fffaf0] text-[#6b4c3b] font-medium hover:border-[#8b5e3c] focus:outline-none focus:ring-2 focus:ring-[#d9b382]"
                      defaultValue={reserva.estado}
                      onChange={(e) =>
                        handleEstadoChange(reserva.reserva_id, e.target.value as Estado)
                      }
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="aceptada">Aceptada</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 space-x-2 flex">
                    <button
                      onClick={() => confirmarCambioEstado(reserva.reserva_id)}
                      className="bg-[#8b5e3c] hover:bg-[#6b4c3b] text-white px-4 py-1 rounded shadow-md transition-colors duration-200"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => handleDelete(reserva.reserva_id)}
                      className="bg-[#c14b3d] hover:bg-[#a03f33] text-white px-4 py-1 rounded shadow-md transition-colors duration-200"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center py-6 text-[#a9745b] italic">
                  No hay reservas disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
