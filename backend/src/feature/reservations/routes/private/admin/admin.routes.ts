import { Router } from "express";
import { adminController } from "@/feature/reservations/controller/adminReserva";
import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";

export const AdminReservaRoute = Router();

AdminReservaRoute.get(
  "/admin/reservation",
  verifyRoute,
  permisionRoles("admin"),
  adminController.getAllReservations
);
AdminReservaRoute.delete(
  "/admin/reservation/:id",
  verifyRoute,
  permisionRoles("admin"),
  adminController.deleteReservation
);
AdminReservaRoute.put(
  "/admin/reservation/:id",
  verifyRoute,
  permisionRoles("admin"),
  adminController.updateReserva
);
