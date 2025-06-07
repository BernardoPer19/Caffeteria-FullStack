import { Router } from "express";

import { ordenController } from "../../../../../feature/ordenes/controller/ordenesController"
import { permisionRoles } from "../../../../..//middleware/permisionRoles";
import { verifyRoute } from "../../../../../middleware/verify";
const SharedOrdersRouter = Router();

SharedOrdersRouter.get(
  "/orders",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  ordenController.obtenerOrdenes
);
SharedOrdersRouter.post(
  "/orders",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  ordenController.crearOrden
);
SharedOrdersRouter.delete(
  "/orders/:id",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  ordenController.eliminarOrden
);
SharedOrdersRouter.put(
  "/orders",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  ordenController.actualizarOrden
);