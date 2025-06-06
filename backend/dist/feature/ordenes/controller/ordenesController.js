"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordenController = void 0;
const catchAsync_1 = require("@/middleware/catchAsync");
const ordenModel_1 = require("../model/ordenModel");
const ordenesSchema_1 = require("../schema/ordenesSchema");
class ordenController {
}
exports.ordenController = ordenController;
_a = ordenController;
ordenController.obtenerOrdenes = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const user = req.user.user_id;
    console.log(req.body);
    const ordenUser = await ordenModel_1.ordenModel.obtenerOrdenes(user);
    res.status(200).json({
        status: "success",
        data: ordenUser,
    });
});
ordenController.crearOrden = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const vali = (0, ordenesSchema_1.validateOrden)(req.body);
    const orden = await ordenModel_1.ordenModel.crearOrden({
        user: vali.user,
        cafe: vali.cafe,
        direccion_orden: vali.direccion_orden,
        cantidad_productos: vali.cantidad_productos,
    });
    res.status(201).json({
        status: "success",
        data: orden,
    });
});
ordenController.eliminarOrden = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const user = req.user.user_id;
    const ordenes = +req.params.id;
    const orden = await ordenModel_1.ordenModel.eliminarOrden(user, ordenes);
    res.status(201).json({
        status: "success",
        data: orden,
    });
});
ordenController.actualizarOrden = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const user = req.user.user_id;
    const orden = +req.params.id;
    const vali = (0, ordenesSchema_1.validateOrden)(req.body);
    const ordenUser = await ordenModel_1.ordenModel.actualizarOrden(user, orden, {
        user: vali.user,
        cafe: vali.cafe,
        direccion_orden: vali.direccion_orden,
        cantidad_productos: vali.cantidad_productos,
    });
    res.status(201).json({
        status: "success",
        data: ordenUser,
    });
});
