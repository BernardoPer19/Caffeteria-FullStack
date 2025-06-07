import { Router } from "express";
import { reservaController } from "../../controller/reservaController";
import { verifyRoute } from "../../../../middleware/verify";

export const reservaRouter = Router();

reservaRouter.get(
  "/",
  verifyRoute,
  reservaController.obtenerTodasLasReservas
);
reservaRouter.post(
  "/",
  verifyRoute,
  reservaController.crearReserva
);