export type Estado = "pendiente" | "aceptada" | "rechazada";

export interface ReservaType {
  reserva_id: number;
  plan_id: number;
  fecha_inicio: string; // ISO 8601 expected
  hora_cita: string; // HH:mm expected
  fecha_fin: string;
  estado: Estado;
}

export type NuevaReservaInput = Omit<ReservaType, "reserva_id">;
