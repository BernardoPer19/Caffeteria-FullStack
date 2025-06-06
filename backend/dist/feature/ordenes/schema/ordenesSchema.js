"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrden = void 0;
const zod_1 = __importDefault(require("zod"));
const schemaOrden = zod_1.default.object({
    user: zod_1.default.object({
        nombre: zod_1.default.string().min(1),
    }),
    cafe: zod_1.default.object({
        nombre: zod_1.default.string().min(1),
    }),
    direccion_orden: zod_1.default.string().min(3),
    cantidad_productos: zod_1.default.number().positive().int()
});
const validateOrden = (input) => {
    const result = schemaOrden.safeParse(input);
    if (!result.success) {
        throw result.error;
    }
    return result.data;
};
exports.validateOrden = validateOrden;
