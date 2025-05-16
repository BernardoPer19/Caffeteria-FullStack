export type Estado = "pendiente" | "aceptada" | "rechazada";

export enum PlanNombre {
  TRABAJAR = "Ir a trabajar",
  ESTUDIAR_SOLO = "Estudiar solo",
  ESTUDIAR_CON_AMIGOS = "Estudiar con amigos",
  CITA = "Cita",
  REUNION_INFORMAL = "Reunión informal",
  FREELANCE = "Trabajo freelance",
  LECTURA = "Lectura personal",
  OTRO = "Plan Otro",
}

export interface ReservaType {
  reserva_id: number;
  plan: PlanNombre;
  fecha_inicio: string; // ISO 8601
  fecha_fin: string;
  hora_cita: string; // HH:mm
  estado: Estado;
}

export type NuevaReservaInput = Omit<ReservaType, "reserva_id">;