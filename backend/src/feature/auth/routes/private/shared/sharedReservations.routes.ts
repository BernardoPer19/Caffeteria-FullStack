import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";
import { Router } from "express";

const SharedReservationsRouter = Router();

SharedReservationsRouter.get("/reservations", () => {});

SharedReservationsRouter.get(
  "/orders",
  verifyRoute,
  permisionRoles("Admin", "Empleado"),
  () => {}
);
SharedReservationsRouter.post(
  "/reservations",
  verifyRoute,
  permisionRoles("Admin", "Empleado"),
  () => {}
);
SharedReservationsRouter.delete(
  "/reservations/:id",
  verifyRoute,
  permisionRoles("Admin", "Empleado"),
  () => {}
);
SharedReservationsRouter.put(
  "/reservations",
  verifyRoute,
  permisionRoles("Admin", "Empleado"),
  () => {}
);
