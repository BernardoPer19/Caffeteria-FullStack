import z from "zod";

export const schemaReserva = z.object({
  plan: z.string().min(1, "El ID del plan es obligatorio"),
  fecha_inicio: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha de inicio debe tener un formato válido (YYYY-MM-DD)",
  }),

  fecha_fin: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha de fin debe tener un formato válido (YYYY-MM-DD)",
  }),

  hora_cita: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "La hora debe tener el formato HH:mm"
    ),

  estado: z.enum(["pendiente", "aceptada", "rechazada"]).default("pendiente"),
});

export type reservasType = z.infer<typeof schemaReserva>;

export const validateReserva = (input: unknown): reservasType => {
  const parsed = schemaReserva.safeParse(input);
  if (!parsed.success) {
    console.error(parsed.error.format());
    throw new Error("Error al validar los datos de la reserva");
  }
  return parsed.data;
};
