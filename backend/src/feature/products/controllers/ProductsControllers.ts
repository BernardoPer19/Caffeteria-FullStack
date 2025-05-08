import { catchAsync } from "@/middleware/catchAsync";
import { Request, Response, NextFunction } from "express";
import { ProductsModels } from "../models/productsModel";

export class ProductController {
  static getAllProducts = catchAsync(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const products = await ProductsModels.getProducts();

      res.status(200).json({
        status: "success",
        results: products.length,
        data: products,
      });
    }
  );
}
