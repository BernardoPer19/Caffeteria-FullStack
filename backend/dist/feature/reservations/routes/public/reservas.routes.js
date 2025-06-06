"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservaRouter = void 0;
const express_1 = require("express");
const reservaController_1 = require("../../controller/reservaController");
const verify_1 = require("@/middleware/verify");
exports.reservaRouter = (0, express_1.Router)();
exports.reservaRouter.get("/", verify_1.verifyRoute, reservaController_1.reservaController.obtenerTodasLasReservas);
exports.reservaRouter.post("/", verify_1.verifyRoute, reservaController_1.reservaController.crearReserva);
