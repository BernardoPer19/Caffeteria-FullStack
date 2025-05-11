import { z } from "zod";
import { validateWithSchema } from "@/utils/validateSchemas";

// Schema base
const baseRegisterSchema = z.object({
  nombre: z.string().min(3),
  email: z.string().email(),
  contraseña: z.string().min(6),
});

export const RegisterUserSchemaPublic = baseRegisterSchema.extend({
  rol: z.enum(["usuario", "empleado", "admin"]).default("usuario"),
});
export type PublicRegisterType = z.infer<typeof RegisterUserSchemaPublic>;

export type AdminRegisterType = z.infer<typeof RegisterUserSchemaAdmin>;

export const RegisterUserSchemaAdmin = baseRegisterSchema.extend({
  rol: z.enum(["usuario", "empleado", "admin"]),
});

export const validateRegisterPublic = (input: unknown) =>
  validateWithSchema(RegisterUserSchemaPublic, input);

export const validateRegisterAdmin = (input: unknown): AdminRegisterType =>
  validateWithSchema(RegisterUserSchemaAdmin, input);



