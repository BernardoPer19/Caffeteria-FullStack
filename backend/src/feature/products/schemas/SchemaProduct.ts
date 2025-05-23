import { z } from "zod";

export const categoriaEnum = z.enum(["Café", "Torta", "Desayuno", "Especial"]);

export const productSchema = z.object({
  nombre: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  descripcion: z
    .string()
    .min(5, { message: "La descripción debe tener al menos 5 caracteres" }),
  sabor: z
    .string()
    .min(3, { message: "El sabor debe tener al menos 3 caracteres" }),
  categoria: categoriaEnum,
  img: z.string().url({ message: "La imagen debe ser una URL válida" }),
  pais: z
    .string()
    .min(3, { message: "El país debe tener al menos 3 caracteres" }),
  precio: z
    .number()
    .positive({ message: "El precio debe ser un número positivo" }),
});

export const updateProductSchema = productSchema.partial();

export const validateProduct = (input: unknown) => {
  const result = productSchema.safeParse(input);
  if (!result.success) throw result.error;
  return result.data;
};

export const validatePartialProduct = (input: unknown) => {
  const result = productSchema.partial().safeParse(input);
  if (!result.success) throw result.error;
  return result.data;
};

export type ProductInput = z.infer<typeof productSchema>;
export type CategoriasCafes = z.infer<typeof categoriaEnum>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
