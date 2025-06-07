import { Router } from "express";
import { verifyRoute } from "../../../../../middleware/verify";
import { permisionRoles } from "../../../../../middleware/permisionRoles";


const SharedReservaRoutes = Router();

SharedReservaRoutes.get(
  "/admin/reservas",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  () => {}
);
SharedReservaRoutes.post(
  "/admin/reservas",
  verifyRoute,
  permisionRoles("admin", "empleado"),
  () => {}
);
