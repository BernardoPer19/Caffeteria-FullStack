import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaReserva, type reservasType } from "../schema/ReservasSchema";
import type { NuevaReservaInput, PlanNombre } from "../types/ReservationsTypes";
import { useUserReservations } from "../hooks/useReservations";
import { AlertTriangle } from "lucide-react"; // Icono para error

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
      estado: "pendiente",
    },
  });

  const { createData } = useUserReservations();

  const onSubmit = (data: reservasType) => {
    const formattedData: NuevaReservaInput = {
      plan: data.plan as PlanNombre,
      fecha_inicio: data.fecha_inicio,
      fecha_fin: data.fecha_fin,
      hora_cita: data.hora_cita,
      estado: data.estado || "pendiente",
    };

    createData.createReservation(formattedData, {
      onSuccess: () => reset(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-12 bg-[#fef9f4] p-8 rounded-3xl shadow-lg border border-[#d7c8b9] space-y-6"
    >
      <h2 className="text-3xl font-extrabold text-center text-[#7a4a11] tracking-wide mb-6 drop-shadow-sm">
        Realizar Reserva
      </h2>

      {/* Plan */}
      <div className="flex flex-col">
        <label
          htmlFor="plan"
          className="mb-2 text-sm font-semibold text-[#7a4a11]"
        >
          Plan
        </label>
        <select
          id="plan"
          {...register("plan")}
          className={`w-full rounded-2xl border border-[#c3ab8e] bg-white py-3 px-4 text-[#5e3b1d] shadow-sm transition
            focus:outline-none focus:ring-4 focus:ring-[#b38749] ${
              errors.plan ? "border-red-500" : "border-[#c3ab8e]"
            }`}
          aria-invalid={errors.plan ? "true" : "false"}
        >
          <option value="">Selecciona un plan</option>
          {PLAN_OPTIONS.map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>
        {errors.plan && (
          <p className="mt-1 flex items-center gap-1 text-red-600 text-sm font-medium animate-shake">
            <AlertTriangle size={16} />
            {errors.plan.message}
          </p>
        )}
      </div>

      {/* Fecha de inicio */}
      <div className="flex flex-col">
        <label
          htmlFor="fecha_inicio"
          className="mb-2 text-sm font-semibold text-[#7a4a11]"
        >
          Fecha de inicio
        </label>
        <input
          id="fecha_inicio"
          type="date"
          {...register("fecha_inicio")}
          className={`w-full rounded-2xl border border-[#c3ab8e] bg-white py-3 px-4 text-[#5e3b1d] shadow-sm transition
            focus:outline-none focus:ring-4 focus:ring-[#b38749] ${
              errors.fecha_inicio ? "border-red-500" : "border-[#c3ab8e]"
            }`}
          aria-invalid={errors.fecha_inicio ? "true" : "false"}
        />
        {errors.fecha_inicio && (
          <p className="mt-1 flex items-center gap-1 text-red-600 text-sm font-medium animate-shake">
            <AlertTriangle size={16} />
            {errors.fecha_inicio.message}
          </p>
        )}
      </div>

      {/* Fecha de fin */}
      <div className="flex flex-col">
        <label
          htmlFor="fecha_fin"
          className="mb-2 text-sm font-semibold text-[#7a4a11]"
        >
          Fecha de fin
        </label>
        <input
          id="fecha_fin"
          type="date"
          {...register("fecha_fin")}
          className={`w-full rounded-2xl border border-[#c3ab8e] bg-white py-3 px-4 text-[#5e3b1d] shadow-sm transition
            focus:outline-none focus:ring-4 focus:ring-[#b38749] ${
              errors.fecha_fin ? "border-red-500" : "border-[#c3ab8e]"
            }`}
          aria-invalid={errors.fecha_fin ? "true" : "false"}
        />
        {errors.fecha_fin && (
          <p className="mt-1 flex items-center gap-1 text-red-600 text-sm font-medium animate-shake">
            <AlertTriangle size={16} />
            {errors.fecha_fin.message}
          </p>
        )}
      </div>

      {/* Hora de la cita */}
      <div className="flex flex-col">
        <label
          htmlFor="hora_cita"
          className="mb-2 text-sm font-semibold text-[#7a4a11]"
        >
          Hora de la cita
        </label>
        <input
          id="hora_cita"
          type="time"
          {...register("hora_cita")}
          className={`w-full rounded-2xl border border-[#c3ab8e] bg-white py-3 px-4 text-[#5e3b1d] shadow-sm transition
            focus:outline-none focus:ring-4 focus:ring-[#b38749] ${
              errors.hora_cita ? "border-red-500" : "border-[#c3ab8e]"
            }`}
          aria-invalid={errors.hora_cita ? "true" : "false"}
        />
        {errors.hora_cita && (
          <p className="mt-1 flex items-center gap-1 text-red-600 text-sm font-medium animate-shake">
            <AlertTriangle size={16} />
            {errors.hora_cita.message}
          </p>
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          disabled={createData.isCreatingReservation}
          className="flex-1 bg-[#7a4a11] hover:bg-[#a36832] active:bg-[#6a3f08] disabled:bg-[#bba87f] disabled:cursor-not-allowed text-white py-3 rounded-2xl font-semibold shadow-lg transition"
        >
          {createData.isCreatingReservation ? "Enviando..." : "Reservar"}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="flex-1 border border-[#7a4a11] text-[#7a4a11] hover:bg-[#f9f3ea] active:bg-[#f0e9dc] py-3 rounded-2xl font-semibold shadow-sm transition"
        >
          Limpiar
        </button>
      </div>
    </form>
  );
};

export default ReservationsForm;
