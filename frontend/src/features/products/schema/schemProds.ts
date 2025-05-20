import { z } from "zod";

export const productSchema = z.object({
  nombre: z.string().min(1, "Nombre obligatorio"),
  descripcion: z.string().min(1),
  sabor: z.string().optional(),
  categoria: z.enum(["Café", "Torta", "Desayuno", "Especial"]),
  img: z.string().url("URL inválida"),
  pais: z.string().min(1),
  precio: z.number().positive("Debe ser mayor que cero"),
});

export type ProductSchema = z.infer<typeof productSchema>;
