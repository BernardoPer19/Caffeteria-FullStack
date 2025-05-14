import { Router } from "express";
import { ordenController } from "@features/ordenes/controller/ordenesController"
import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";

export const adminRoute = Router();

adminRoute.get("/orden",verifyRoute,permisionRoles("admin"),ordenController.obtenerOrdenes);
adminRoute.post("/orden",verifyRoute,permisionRoles("admin"),ordenController.crearOrden);
adminRoute.put("/orden/:id", verifyRoute,permisionRoles("admin"),ordenController.actualizarOrden);
adminRoute.delete("/orden/:id",verifyRoute,permisionRoles("admin"),ordenController.eliminarOrden);   