"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const AppError_1 = require("@/utils/AppError");
const errorHandler = (err, _req, res, _next) => {
    // Errores de validación con Zod
    if (err instanceof zod_1.ZodError) {
        const errors = err.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
        }));
        return res.status(400).json({
            success: false,
            errors,
        });
    }
    // Errores personalizados
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    // Error inesperado
    console.error("❌ Error inesperado:", err);
    return res.status(500).json({
        success: false,
        message: "Error interno del servidor",
    });
};
exports.errorHandler = errorHandler;
