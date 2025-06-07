import { Router } from "express";
import { ordenController } from "../../controller/ordenesController"
import { verifyRoute } from "../../../../middleware/verify";

export const ordenRoute = Router();

ordenRoute.get("/", verifyRoute, ordenController.obtenerOrdenes);
ordenRoute.post("/", verifyRoute, ordenController.crearOrden);
ordenRoute.put("/:id", verifyRoute, ordenController.actualizarOrden);
ordenRoute.delete("/:id", verifyRoute, ordenController.eliminarOrden);    