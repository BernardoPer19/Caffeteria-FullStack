import { NextFunction, Request, Response } from "express";
import { adminModel } from "../model/adminModel";
import { validateReserva } from "../schema/reservaSchema";
import { ReservaType } from "../types/reserva";
import { planTrabajo } from "../model/controlId";
import { catchAsync } from "@/middleware/catchAsync";

export class adminController {
  static getAllReservations = catchAsync(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const reserva = await adminModel.obtenerTodasLasReservas();
      res.status(200).json(reserva);
    }
  );

  static deleteReservation = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const reservaId = +req.params.id;
      const reserva = await adminModel.eliminarUnaReserva(reservaId);
      res.status(200).json(reserva);
    }
  );

  static updateReserva = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const reserva = +req.params.id;
      const vali = validateReserva(req.body);
      const plan = vali.plan;
      const planId = await planTrabajo.controlIdPlan(plan);

      const reservaAdmin = await adminModel.acualizarUnaReserva(reserva, {
        plan_id: planId,
        fecha_inicio: vali.fecha_inicio,
        fecha_fin: vali.fecha_fin,
      } as ReservaType);

      res
        .status(201)
        .json({ message: " se actualizo la cita  exitosamente", reservaAdmin });
    }
  );
}
