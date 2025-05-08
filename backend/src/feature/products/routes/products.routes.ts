import { Router } from "express";
import { ProductController } from "../controllers/ProductsControllers";

export const ProductsRouter = Router();

ProductsRouter.get("/", ProductController.getAllProducts);
ProductsRouter.post("/", ProductController.getAllProducts);
ProductsRouter.delete("/:id", ProductController.getAllProducts);
ProductsRouter.put("/:id", ProductController.getAllProducts);
