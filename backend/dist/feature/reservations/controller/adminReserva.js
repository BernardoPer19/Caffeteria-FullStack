"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = void 0;
const adminModel_1 = require("../model/adminModel");
const catchAsync_1 = require("@/middleware/catchAsync");
class adminController {
}
exports.adminController = adminController;
_a = adminController;
adminController.getAllReservations = (0, catchAsync_1.catchAsync)(async (_req, res, _next) => {
    const reserva = await adminModel_1.adminModel.obtenerTodasLasReservas();
    res.status(200).json(reserva);
});
adminController.deleteReservation = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const reservaId = +req.params.id; //??
    const reserva = await adminModel_1.adminModel.eliminarUnaReserva(reservaId);
    res.status(200).json(reserva);
});
adminController.updateEstadoReserva = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const reservaId = +req.params.id;
    const { estado } = req.body;
    if (!["pendiente", "aceptada", "rechazada"].includes(estado)) {
        return res.status(400).json({ message: "Estado inválido" });
    }
    const updated = await adminModel_1.adminModel.actualizarEstadoReserva(reservaId, estado);
    if (!updated) {
        return res.status(404).json({ message: "Reserva no encontrada" });
    }
    return res.status(200).json(updated);
});
