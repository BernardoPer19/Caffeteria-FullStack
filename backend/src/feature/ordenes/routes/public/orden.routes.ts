import { Router } from "express";
import { verifyRoute } from "@/middleware/verify";
import { ordenController } from "../../controller/ordenesController"

export const ordenRoute = Router();

ordenRoute.get("/",verifyRoute,ordenController.obtenerOrdenes);
ordenRoute.post("/",verifyRoute,ordenController.crearOrden);
ordenRoute.put("/:id",verifyRoute, ordenController.actualizarOrden);
ordenRoute.delete("/:id",verifyRoute,ordenController.eliminarOrden);    