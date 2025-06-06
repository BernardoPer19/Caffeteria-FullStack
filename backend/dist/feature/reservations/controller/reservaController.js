"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservaController = void 0;
const reservaModel_1 = require("../model/reservaModel");
const reservaSchema_1 = require("../schema/reservaSchema");
const controlId_1 = require("../model/controlId");
const catchAsync_1 = require("@/middleware/catchAsync");
class reservaController {
}
exports.reservaController = reservaController;
_a = reservaController;
reservaController.obtenerTodasLasReservas = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const user = req.user.user_id;
    const resultReserva = await reservaModel_1.reservaModel.obtenerReservas(user);
    res.status(200).json(resultReserva);
});
reservaController.crearReserva = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const user = req.user.user_id;
    const vali = (0, reservaSchema_1.validateReserva)(req.body);
    const nombrePlan = vali.plan;
    const idReal = await controlId_1.planTrabajo.controlIdPlan(nombrePlan);
    const newReserva = await reservaModel_1.reservaModel.crearReservas(user, {
        plan_id: idReal,
        fecha_inicio: vali.fecha_inicio,
        fecha_fin: vali.fecha_fin,
        hora_cita: vali.hora_cita,
    });
    return res.status(201).json({ message: newReserva });
});
