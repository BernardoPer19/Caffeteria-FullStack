import z from "zod";

export const schemaReserva = z.object({
  plan: z.string().min(1, "El ID del plan es obligatorio"),
  fecha_inicio: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha de inicio debe tener un formato válido (YYYY-MM-DD)",
  }),
  fecha_fin: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "La fecha de fin debe tener un formato válido (YYYY-MM-DD)",
  }),
  hora_cita: z.string(),
  estado: z.enum(["pendiente", "aceptada", "rechazada"]).default("pendiente"),
});

export type reservasType = z.infer<typeof schemaReserva>;

export const validateReserva = (input: unknown): reservasType => {
  const vali = schemaReserva.safeParse(input);
  console.log(vali);

  if (!vali.success) {
    throw new Error("error al validar los datos");
  }
  return vali.data;
};
