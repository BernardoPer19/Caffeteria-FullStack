import { catchAsync } from "@/middleware/catchAsync";
import { Request, Response, NextFunction } from "express";
import { ProductsModel } from "../models/productsModel";
import { validateProduct } from "../schemas/SchemaProduct";

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

  static create = catchAsync(async (req: Request, res: Response) => {
    const validated = validateProduct(req.body);
    const createdProduct = await ProductsModel.create(validated);

    res.status(201).json({
      success: true,
      message: "Producto creado correctamente",
      data: createdProduct,
    });
  });

  static remove = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "ID del producto requerido" });
    }

    await ProductsModel.delete(Number(id));
    res.status(200).json({
      success: true,
      message: "Producto eliminado correctamente",
    });
  });
}
