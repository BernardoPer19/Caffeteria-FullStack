import { z } from "zod";
import { validateWithSchema } from "@/utils/validateSchemas";

// Schema base para Login (solo email y contraseña)
const baseLoginSchema = z.object({
  email: z.string().email("Email no válido"),
  contraseña: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

// El esquema de login no tiene rol
export const LoginUserSchema = baseLoginSchema;

export type LoginUserType = z.infer<typeof LoginUserSchema>;

// Función de validación para el login
export const validateLogin = (input: unknown): LoginUserType =>
  validateWithSchema(LoginUserSchema, input);
