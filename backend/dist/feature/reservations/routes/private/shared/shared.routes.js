"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permisionRoles_1 = require("@/middleware/permisionRoles");
const verify_1 = require("@/middleware/verify");
const SharedReservaRoutes = (0, express_1.Router)();
SharedReservaRoutes.get("/admin/reservas", verify_1.verifyRoute, (0, permisionRoles_1.permisionRoles)("admin", "empleado"), () => { });
SharedReservaRoutes.post("/admin/reservas", verify_1.verifyRoute, (0, permisionRoles_1.permisionRoles)("admin", "empleado"), () => { });
