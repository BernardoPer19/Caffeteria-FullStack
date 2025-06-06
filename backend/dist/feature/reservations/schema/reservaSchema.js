"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReserva = exports.schemaReserva = void 0;
const zod_1 = __importDefault(require("zod"));
exports.schemaReserva = zod_1.default.object({
    plan: zod_1.default.string().min(1, "El ID del plan es obligatorio"),
    fecha_inicio: zod_1.default.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "La fecha de inicio debe tener un formato válido (YYYY-MM-DD)",
    }),
    fecha_fin: zod_1.default.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "La fecha de fin debe tener un formato válido (YYYY-MM-DD)",
    }),
    hora_cita: zod_1.default
        .string()
        .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "La hora debe tener el formato HH:mm"),
    estado: zod_1.default.enum(["pendiente", "aceptada", "rechazada"]).default("pendiente"),
});
const validateReserva = (input) => {
    const parsed = exports.schemaReserva.safeParse(input);
    if (!parsed.success) {
        console.error(parsed.error.format());
        throw new Error("Error al validar los datos de la reserva");
    }
    return parsed.data;
};
exports.validateReserva = validateReserva;
