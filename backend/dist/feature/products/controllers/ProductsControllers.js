"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const catchAsync_1 = require("@/middleware/catchAsync");
const productsModel_1 = require("../models/productsModel");
const SchemaProduct_1 = require("../schemas/SchemaProduct");
class ProductController {
}
exports.ProductController = ProductController;
_a = ProductController;
ProductController.getAll = (0, catchAsync_1.catchAsync)(async (_req, res) => {
    const allProducts = await productsModel_1.ProductsModel.findAll();
    res.status(200).json({
        success: true,
        results: allProducts.length,
        data: allProducts,
    });
});
ProductController.getById = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID del producto requerido" });
    }
    const product = await productsModel_1.ProductsModel.findById(Number(id));
    if (!product) {
        return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json({
        success: true,
        message: "Producto encontrado",
        data: product,
    });
});
ProductController.create = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const validated = (0, SchemaProduct_1.validateProduct)(req.body);
    const createdProduct = await productsModel_1.ProductsModel.create(validated);
    res.status(201).json({
        success: true,
        message: "Producto creado correctamente",
        data: createdProduct,
    });
});
ProductController.remove = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "ID del producto requerido" });
    }
    await productsModel_1.ProductsModel.delete(Number(id));
    return res.status(200).json({
        success: true,
        message: "Producto eliminado correctamente",
    });
});
ProductController.updateProduct = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const id = Number(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "El ID debe ser un número válido",
        });
    }
    const updateData = SchemaProduct_1.updateProductSchema.parse(req.body);
    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
            success: false,
            message: "Debes proporcionar al menos un campo para actualizar",
        });
    }
    const updatedProduct = await productsModel_1.ProductsModel.update(id, updateData);
    if (!updatedProduct) {
        return res.status(404).json({
            success: false,
            message: "Producto no encontrado",
        });
    }
    return res.status(200).json({
        success: true,
        message: "Producto actualizado correctamente",
        data: updatedProduct,
    });
});
ProductController.getByCategory = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const category = req.query.categoria;
    if (typeof category !== "string" || !category.trim()) {
        return res.status(400).json({
            success: false,
            message: "La categoría es requerida y debe ser un string válido",
        });
    }
    const products = await productsModel_1.ProductsModel.findByCategory(category);
    return res.status(200).json({
        success: true,
        results: products.length,
        data: products,
    });
});
