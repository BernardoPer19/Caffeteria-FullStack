import { Router } from "express";
import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";

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
