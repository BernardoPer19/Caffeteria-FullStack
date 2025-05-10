import { Router } from "express";
import { ProductController } from "../controllers/ProductsControllers";

export const ProductsRouter = Router();

ProductsRouter.get("/", ProductController.getAll);
ProductsRouter.get("/buscar", ProductController.getByCategory);
ProductsRouter.get("/:id", ProductController.getById);
ProductsRouter.post("/", ProductController.create);
ProductsRouter.delete("/:id", ProductController.remove);
ProductsRouter.put("/:id", ProductController.updateProduct);
