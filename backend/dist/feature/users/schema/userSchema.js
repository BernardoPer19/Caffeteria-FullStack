"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserByAdmin = exports.validatePartialUserByAdmin = exports.partialUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const userSchema = zod_1.default.object({
    nombre: zod_1.default
        .string()
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    email: zod_1.default
        .string()
        .min(1, { message: "El campo email es obligatorio" })
        .email({ message: "Revisa el formato del email" }),
    // contraseña: z
    //   .string()
    //   .min(4, { message: "La contraseña debe tener entre 4 y 12 caracteres" })
    //   .max(50, { message: "La contraseña debe tener entre 4 y 12 caracteres" })
    //   .optional(),
    rol: zod_1.default.enum(["usuario", "empleado", "admin"]),
});
exports.partialUserSchema = userSchema.partial();
const validatePartialUserByAdmin = (input) => {
    const result = exports.partialUserSchema.safeParse(input);
    if (!result.success) {
        throw result.error;
    }
    return result.data;
};
exports.validatePartialUserByAdmin = validatePartialUserByAdmin;
const validateUserByAdmin = (input) => {
    const result = userSchema.safeParse(input);
    if (!result.success) {
        throw result.error;
    }
    return result.data;
};
exports.validateUserByAdmin = validateUserByAdmin;
