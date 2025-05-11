import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";
import { Router } from "express";

const SharedOrdersRouter = Router();

SharedOrdersRouter.get("/reservations", () => {});

SharedOrdersRouter.get(
  "/orders",
  verifyRoute,
  permisionRoles("Admin", "Empleado"),
  () => {}
);
SharedOrdersRouter.post(
  "/orders",
  verifyRoute,
  permisionRoles("Admin", "Empleado"),
  () => {}
);
SharedOrdersRouter.delete(
  "/orders/:id",
  verifyRoute,
  permisionRoles("Admin", "Empleado"),
  () => {}
);
SharedOrdersRouter.put(
  "/orders",
  verifyRoute,
  permisionRoles("Admin", "Empleado"),
  () => {}
);
