import { z } from "zod";

// El campo `estado` es obligatorio ahora y tiene un valor por defecto
export const schemaReserva = z.object({
  plan: z.string(),
  fecha_inicio: z.string(),
  fecha_fin: z.string(),
  hora_cita: z.string(),
  estado: z.enum(["pendiente", "aceptada", "rechazada"]).optional(),
});

export type reservasType = z.infer<typeof schemaReserva>;
