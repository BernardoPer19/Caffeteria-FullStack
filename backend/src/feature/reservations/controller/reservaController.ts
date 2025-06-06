import { NextFunction, Request, Response } from "express";
import { reservaModel } from "../model/reservaModel";
import { validateReserva } from "../schema/reservaSchema";
import {  ReservaType } from "../types/reserva";
import { planTrabajo } from "../model/controlId";
import { catchAsync } from "../../..//middleware/catchAsync";

export class reservaController {
  static obtenerTodasLasReservas = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user = req.user.user_id;

      const resultReserva = await reservaModel.obtenerReservas(user);
      res.status(200).json(resultReserva);
    }
  );

  static crearReserva = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user = req.user.user_id;
      const vali = validateReserva(req.body);
      const nombrePlan = vali.plan;
      const idReal = await planTrabajo.controlIdPlan(nombrePlan);

      const newReserva = await reservaModel.crearReservas(user, {
        plan_id: idReal,
        fecha_inicio: vali.fecha_inicio,
        fecha_fin: vali.fecha_fin,
        hora_cita: vali.hora_cita,
      } as ReservaType);

      return res.status(201).json({ message: newReserva });
    }
  );
}