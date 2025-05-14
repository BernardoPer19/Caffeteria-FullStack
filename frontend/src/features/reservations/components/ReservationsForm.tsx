import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReservations } from "../hooks/useReservations";
import { schemaReserva, type reservasType } from "../schema/ReservasSchema";
import type { NuevaReservaInput, PlanNombre } from "../types/ReservationsTypes";

// Opciones de planes como strings
const PLAN_OPTIONS = [
  "Ir a trabajar",
  "Estudiar solo",
  "Estudiar con amigos",
  "Cita",
  "Reunión informal",
  "Trabajo freelance",
  "Lectura personal",
  "Plan Otro",
];

const ReservationsForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<reservasType>({
    resolver: zodResolver(schemaReserva),
    defaultValues: {
      plan: "",
      fecha_inicio: "",
      fecha_fin: "",
      hora_cita: "",
      estado: "pendiente", // No opcional, ya es predeterminado aquí
    },
  });

  const { createData } = useReservations();

  const onSubmit = (data: reservasType) => {
    const formattedData: NuevaReservaInput = {
      plan: data.plan as PlanNombre,
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      hora_cita: data.hora_cita,
      estado: data.estado || "pendiente", // Aseguramos un valor predeterminado válido
    };

    createData.createReservation(formattedData, {
      onSuccess: () => reset(),
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
        <label className="block text-sm font-medium text-[#5e3b1d] mb-1">
          Plan
        </label>
        <select
          {...register("plan")}
          className="w-full border rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-[#b77e58]"
        >
          <option value="">Selecciona un plan</option>
          {PLAN_OPTIONS.map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>
        {errors.plan && (
          <p className="text-red-500 text-sm mt-1">{errors.plan.message}</p>
        )}
      </div>

      {/* Fecha de inicio */}
      <div>
        <label className="block text-sm font-medium text-[#5e3b1d] mb-1">
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

      {/* Fecha de fin */}
      <div>
        <label className="block text-sm font-medium text-[#5e3b1d] mb-1">
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

      {/* Hora de la cita */}
      <div>
        <label className="block text-sm font-medium text-[#5e3b1d] mb-1">
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

      {/* Botones */}
      <div className="flex justify-between gap-2 pt-4">
        <button
          type="submit"
          disabled={createData.isCreatingReservation}
          className="flex-1 bg-[#5e3b1d] hover:bg-[#452c14] text-white py-2 px-4 rounded-xl transition"
        >
          {createData.isCreatingReservation ? "Enviando..." : "Reservar"}
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
};

export default ReservationsForm;
