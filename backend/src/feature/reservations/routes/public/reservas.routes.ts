import { Router } from "express";
import { reservaController } from "../../controller/reservaController";
import { verifyRoute } from "@/middleware/verify";
import { permisionRoles } from "@/middleware/permisionRoles";

export const reservaRouter = Router();

reservaRouter.get(
  "/reservas",
  verifyRoute,
  reservaController.obtenerTodasLasReservas
);
reservaRouter.post(
  "/reservas",
  verifyRoute,
  reservaController.crearReserva
);
