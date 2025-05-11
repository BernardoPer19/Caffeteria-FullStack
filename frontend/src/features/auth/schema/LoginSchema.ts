import { z } from "zod";
import { validateWithSchema } from "../../../utils/validateSchemas";

// Schema base para Login (solo email y contraseña)
export const LoginSchema = z.object({
  email: z.string().email("Email no válido"),
  contraseña: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const LoginUserSchema = LoginSchema;

export type LoginUserType = z.infer<typeof LoginUserSchema>;

export const validateLogin = (input: unknown): LoginUserType =>
  validateWithSchema(LoginUserSchema, input);
