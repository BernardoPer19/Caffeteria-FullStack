import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";
import { Router } from "express";

const SharedProductsRotuer = Router();

SharedProductsRotuer.get("/orders", () => {});
SharedProductsRotuer.get("/reservations", () => {});

SharedProductsRotuer.get(
  "/allProds",
  verifyRoute,
  permisionRoles("Admin", "Empleado"),
  () => {}
);
SharedProductsRotuer.post(
  "/products",
  verifyRoute,
  permisionRoles("Admin", "Empleado"),
  () => {}
);
SharedProductsRotuer.delete(
  "/products/:id",
  verifyRoute,
  permisionRoles("Admin", "Empleado"),
  () => {}
);
SharedProductsRotuer.put(
  "/products",
  verifyRoute,
  permisionRoles("Admin", "Empleado"),
  () => {}
);
