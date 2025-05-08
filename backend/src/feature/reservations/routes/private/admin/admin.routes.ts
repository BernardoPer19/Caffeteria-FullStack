import { Router } from "express";
import { adminController } from "@/feature/reservations/controller/adminReserva";

export const AdminReservaRoute = Router();

AdminReservaRoute.get("/reservation", adminController.getAllReservations);
AdminReservaRoute.delete( "/reservation/:id",adminController.deleteReservation);
AdminReservaRoute.put("/reservation/:id",adminController.updateReserva);
