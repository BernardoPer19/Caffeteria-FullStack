import z from "zod";

const schemaOrden = z.object({
  user: z.object({
    nombre: z.string().min(1),
  }),
  cafe: z.object({
    nombre: z.string().min(1),
  }),
  direccion_orden: z.string().min(3),
  cantidad_productos: z.number().positive().int()
});


export const validateOrden = (input: unknown) => {
  const result = schemaOrden.safeParse(input);
  if (!result.success) {
    throw result.error;
  }
  return result.data;
};

export type OrdenData = z.infer<typeof schemaOrden>;
