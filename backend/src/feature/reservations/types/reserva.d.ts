enum Estado {
  pendiente = "pendiente",
  aceptada = "aceptada",
  rechazada = "rechazada",
}

export interface Reserva {
  reserva_id: number;
  plan_id: number;
  fecha_inicio: string;
  fecha_fin: string;
  estado: Estado;
}

export type ReservaType = Pick<Reserva,'plan_id' | 'fecha_inicio' | 'fecha_fin'|'estado'>;
