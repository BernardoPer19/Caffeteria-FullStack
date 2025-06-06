"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = exports.validateLogin = exports.MixedUserSchema = void 0;
const zod_1 = require("zod");
// Schema general
exports.MixedUserSchema = zod_1.z.object({
    nombre: zod_1.z
        .string()
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    email: zod_1.z
        .string()
        .min(1, { message: "El campo email es obligatorio" })
        .email({ message: "Revisa el formato del email" }),
    contraseña: zod_1.z
        .string()
        .min(4, { message: "La contraseña debe tener entre 4 y 12 caracteres" })
        .max(50, { message: "La contraseña debe tener entre 4 y 12 caracteres" }),
    rol: zod_1.z.enum(["usuario", "empleado", "admin"]).optional(),
});
const LoginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Email no válido"),
    contraseña: zod_1.z
        .string()
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
});
const validateLogin = (input) => {
    return LoginSchema.parse(input);
};
exports.validateLogin = validateLogin;
const validateRegister = (input) => {
    const result = exports.MixedUserSchema.safeParse(input);
    if (!result.success) {
        throw result.error;
    }
    return result.data;
};
exports.validateRegister = validateRegister;
