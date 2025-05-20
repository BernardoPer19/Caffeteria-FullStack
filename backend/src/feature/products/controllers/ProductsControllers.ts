import { catchAsync } from "@/middleware/catchAsync";
import { Request, Response, NextFunction } from "express";
import { ProductsModel } from "../models/productsModel";
import { updateProductSchema, validateProduct } from "../schemas/SchemaProduct";

export class ProductController {
  static getAll = catchAsync(async (_req: Request, res: Response) => {
    const allProducts = await ProductsModel.findAll();

    res.status(200).json({
      success: true,
      results: allProducts.length,
      data: allProducts,
    });
  });

  static getById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID del producto requerido" });
    }

    const product = await ProductsModel.findById(Number(id));
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.status(200).json({
      success: true,
      message: "Producto encontrado",
      data: product,
    });
  });

  static create = async (req: Request, res: Response) => {
    try {
      const validated = validateProduct(req.body);
      const createdProduct = await ProductsModel.create(validated);

      res.status(201).json({
        success: true,
        message: "Producto creado correctamente",
        data: createdProduct,
      });
    } catch (error) {
      res.status(404).json(error.message)
    }
  };

  static remove = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "ID del producto requerido" });
    }

    await ProductsModel.delete(Number(id));
    res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente",
    });
  });

  static updateProduct = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const id = Number(req.params.id);

      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: "El ID debe ser un número válido",
        });
      }

      const updateData = updateProductSchema.parse(req.body);

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
          success: false,
          message: "Debes proporcionar al menos un campo para actualizar",
        });
      }

      const updatedProduct = await ProductsModel.update(id, updateData);

      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          message: "Producto no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        message: "Producto actualizado correctamente",
        data: updatedProduct,
      });
    }
  );

  static getByCategory = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const category = req.query.categoria;

      if (typeof category !== "string" || !category.trim()) {
        return res.status(400).json({
          success: false,
          message: "La categoría es requerida y debe ser un string válido",
        });
      }

      const products = await ProductsModel.findByCategory(category);

      res.status(200).json({
        success: true,
        results: products.length,
        data: products,
      });
    }
  );
}
