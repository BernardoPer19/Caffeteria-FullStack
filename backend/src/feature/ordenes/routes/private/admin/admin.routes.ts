import { Router } from "express";
import { ordenController } from "@features/ordenes/controller/ordenesController"

export const adminRoute = Router();

adminRoute.get("/",ordenController.obtenerOrdenes);
adminRoute.post("/",ordenController.crearOrden);
adminRoute.put("/:id", ordenController.actualizarOrden);
adminRoute.delete("/:id",ordenController.eliminarOrden);