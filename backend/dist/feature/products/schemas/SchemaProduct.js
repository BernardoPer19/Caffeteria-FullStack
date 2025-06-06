"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePartialProduct = exports.validateProduct = exports.updateProductSchema = exports.productSchema = exports.categoriaEnum = void 0;
const zod_1 = require("zod");
exports.categoriaEnum = zod_1.z.enum(["Café", "Torta", "Desayuno", "Especial"]);
exports.productSchema = zod_1.z.object({
    nombre: zod_1.z
        .string()
        .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    descripcion: zod_1.z
        .string()
        .min(5, { message: "La descripción debe tener al menos 5 caracteres" }),
    sabor: zod_1.z
        .string()
        .min(3, { message: "El sabor debe tener al menos 3 caracteres" }),
    categoria: exports.categoriaEnum,
    img: zod_1.z.string().url({ message: "La imagen debe ser una URL válida" }),
    pais: zod_1.z
        .string()
        .min(3, { message: "El país debe tener al menos 3 caracteres" }),
    precio: zod_1.z
        .number()
        .positive({ message: "El precio debe ser un número positivo" }),
});
exports.updateProductSchema = exports.productSchema.partial();
const validateProduct = (input) => {
    const result = exports.productSchema.safeParse(input);
    if (!result.success)
        throw result.error;
    return result.data;
};
exports.validateProduct = validateProduct;
const validatePartialProduct = (input) => {
    const result = exports.productSchema.partial().safeParse(input);
    if (!result.success)
        throw result.error;
    return result.data;
};
exports.validatePartialProduct = validatePartialProduct;
