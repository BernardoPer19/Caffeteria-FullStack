import { permisionRoles } from "../../../../../middleware/permisionRoles";
import { verifyRoute } from "../../../../../middleware/verify";
import { Router } from "express";

const SharedOrdersRouter = Router();

SharedOrdersRouter.get("/reservations", () => { });

SharedOrdersRouter.get(
  "/orders",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  () => { }
);
SharedOrdersRouter.post(
  "/orders",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  () => { }
);
SharedOrdersRouter.delete(
  "/orders/:id",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  () => { }
);
SharedOrdersRouter.put(
  "/orders",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  () => { }
);
