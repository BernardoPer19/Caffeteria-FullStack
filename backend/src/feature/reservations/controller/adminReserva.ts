import { NextFunction, Request, Response } from "express";
import { adminModel } from "../model/adminModel";
import { catchAsync } from "../../..//middleware/catchAsync";

export class adminController {
  static getAllReservations = catchAsync(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const reserva = await adminModel.obtenerTodasLasReservas();
      res.status(200).json(reserva);
    }
  );

  static deleteReservation = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const reservaId = +req.params.id; //??
      const reserva = await adminModel.eliminarUnaReserva(reservaId);
      res.status(200).json(reserva);
    }
  );

  static updateEstadoReserva = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const reservaId = + req.params.id;
      const { estado } = req.body;

      if (!["pendiente", "aceptada", "rechazada"].includes(estado)) {
        return res.status(400).json({ message: "Estado inválido" });
      }

      const updated = await adminModel.actualizarEstadoReserva(
        reservaId,
        estado
      );
      if (!updated) {
        return res.status(404).json({ message: "Reserva no encontrada" });
      }

      return res.status(200).json(updated);
    }
  );
}
