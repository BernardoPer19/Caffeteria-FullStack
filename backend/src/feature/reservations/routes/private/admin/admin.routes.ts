import { Router } from "express";
import { verifyRoute } from "../../../../../middleware/verify";
import { permisionRoles } from "../../../../../middleware/permisionRoles";
import { adminController } from "../../../controller/adminReserva";

export const AdminReservaRoute = Router();

AdminReservaRoute.get(
  "/admin/reservations",
  verifyRoute,
  permisionRoles("admin"),
  adminController.getAllReservations
);
AdminReservaRoute.delete(
  "/admin/reservations/:id",
  verifyRoute,
  permisionRoles("admin"),
  adminController.deleteReservation
);

AdminReservaRoute.patch(
  "/admin/reservations/estado/:id",
  verifyRoute,
  permisionRoles("admin"),
  adminController.updateEstadoReserva
);