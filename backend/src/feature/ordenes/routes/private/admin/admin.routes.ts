import { Router } from "express";
import { ordenController } from "@features/ordenes/controller/ordenesController"
import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";

export const adminRoute = Router();

adminRoute.get("/",verifyRoute,permisionRoles("admin"),ordenController.obtenerOrdenes);
adminRoute.post("/",verifyRoute,permisionRoles("admin"),ordenController.crearOrden);
adminRoute.put("/:id", verifyRoute,permisionRoles("admin"),ordenController.actualizarOrden);
adminRoute.delete("/:id",verifyRoute,permisionRoles("admin"),ordenController.eliminarOrden);