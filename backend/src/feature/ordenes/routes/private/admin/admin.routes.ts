import { Router } from "express";
import { ordenController } from "../../../../../feature/ordenes/controller/ordenesController"
import { permisionRoles } from "../../../../..//middleware/permisionRoles";
import { verifyRoute } from "../../../../../middleware/verify";

export const adminOrdenRoute = Router();

adminOrdenRoute.get("/orden", verifyRoute, permisionRoles("admin"), ordenController.obtenerOrdenes);
adminOrdenRoute.post("/orden", verifyRoute, permisionRoles("admin"), ordenController.crearOrden);
adminOrdenRoute.put("/orden/:id", verifyRoute, permisionRoles("admin"), ordenController.actualizarOrden);
adminOrdenRoute.delete("/orden/:id", verifyRoute, permisionRoles("admin"), ordenController.eliminarOrden);   