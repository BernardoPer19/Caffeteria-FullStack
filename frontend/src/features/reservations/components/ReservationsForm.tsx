import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReservations } from "../hooks/useReservations"; // ✅ Ajustá la ruta si es necesario
import { schemaReserva, type reservasType } from "../schema/ReservasSchema";
import type { NuevaReservaInput } from "../types/ReservationsTypes";

function ReservationsForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<reservasType>({
    resolver: zodResolver(schemaReserva),
    defaultValues: {
      estado: "pendiente",
    },
  });

  const { createReservation, isCreatingReservation } = useReservations();

  const onSubmit = (data: reservasType) => {
    const formattedData: NuevaReservaInput = {
      plan_id: Number(data.plan),
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      hora_cita: data.hora_cita,
      estado: data.estado,
    };

    createReservation(formattedData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow-md border space-y-4"
    >
      <h2 className="text-2xl font-bold text-center text-[#5e3b1d] mb-4">
        Realizar Reserva
      </h2>

      {/* Plan */}
      <div>
        <label className="block font-medium text-sm text-[#5e3b1d] mb-1">
          Plan
        </label>
        <select
          {...register("plan")}
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#b77e58]"
        >
          <option value="">Selecciona un plan</option>
          <option value="1">Plan Básico</option>
          <option value="2">Plan Premium</option>
        </select>
        {errors.plan && (
          <p className="text-red-500 text-sm mt-1">{errors.plan.message}</p>
        )}
      </div>

      {/* Fecha inicio */}
      <div>
        <label className="block font-medium text-sm text-[#5e3b1d] mb-1">
          Fecha de inicio
        </label>
        <input
          type="date"
          {...register("fecha_inicio")}
          className="w-full border rounded-xl p-2"
        />
        {errors.fecha_inicio && (
          <p className="text-red-500 text-sm mt-1">
            {errors.fecha_inicio.message}
          </p>
        )}
      </div>

      {/* Fecha fin */}
      <div>
        <label className="block font-medium text-sm text-[#5e3b1d] mb-1">
          Fecha de fin
        </label>
        <input
          type="date"
          {...register("fecha_fin")}
          className="w-full border rounded-xl p-2"
        />
        {errors.fecha_fin && (
          <p className="text-red-500 text-sm mt-1">
            {errors.fecha_fin.message}
          </p>
        )}
      </div>

      {/* Hora de cita */}
      <div>
        <label className="block font-medium text-sm text-[#5e3b1d] mb-1">
          Hora de la cita
        </label>
        <input
          type="time"
          {...register("hora_cita")}
          className="w-full border rounded-xl p-2"
        />
        {errors.hora_cita && (
          <p className="text-red-500 text-sm mt-1">
            {errors.hora_cita.message}
          </p>
        )}
      </div>

      {/* Estado */}
      <div>
        <label className="block font-medium text-sm text-[#5e3b1d] mb-1">
          Estado
        </label>
        <select
          {...register("estado")}
          className="w-full border rounded-xl p-2"
        >
          <option value="pendiente">Pendiente</option>
          <option value="aceptada">Aceptada</option>
          <option value="rechazada">Rechazada</option>
        </select>
      </div>

      {/* Botones */}
      <div className="flex justify-between gap-2 pt-4">
        <button
          type="submit"
          disabled={isCreatingReservation}
          className="flex-1 bg-[#5e3b1d] hover:bg-[#452c14] text-white py-2 px-4 rounded-xl transition"
        >
          {isCreatingReservation ? "Enviando..." : "Reservar"}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="flex-1 border border-[#5e3b1d] text-[#5e3b1d] hover:bg-[#f3ebe5] py-2 px-4 rounded-xl transition"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
}

export default ReservationsForm;
