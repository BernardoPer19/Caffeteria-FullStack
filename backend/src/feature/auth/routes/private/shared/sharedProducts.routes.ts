import { ProductController } from "@/feature/products/controllers/ProductsControllers";
import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";
import { Router } from "express";

const SharedProductsRotuer = Router();

SharedProductsRotuer.get(
  "/allProds",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  ProductController.getAll
);
SharedProductsRotuer.post(
  "/products",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  ProductController.create
);
SharedProductsRotuer.delete(
  "/products/:id",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  ProductController.remove
);
SharedProductsRotuer.put(
  "/products",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  ProductController.updateProduct
);
