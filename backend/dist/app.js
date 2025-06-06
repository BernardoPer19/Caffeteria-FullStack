"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const Auth_routes_1 = __importDefault(require("./feature/auth/routes/public/Auth.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorhandle_1 = require("./middleware/errorhandle");
const orden_routes_1 = require("./feature/ordenes/routes/public/orden.routes");
const reservas_routes_1 = require("./feature/reservations/routes/public/reservas.routes");
const products_routes_1 = require("./feature/products/routes/products.routes");
const adminUser_routes_1 = require("./feature/users/routes/private/admin/adminUser.routes");
const admin_routes_1 = require("./feature/ordenes/routes/private/admin/admin.routes");
const admin_routes_2 = require("./feature/reservations/routes/private/admin/admin.routes");
const admin_routes_3 = require("./feature/auth/routes/private/admin/admin.routes");
//prueba despues lo borras esto
//import AuthRouter2 from "./feature/auth/routes/public/Auth.routes";
exports.app = (0, express_1.default)();
const PORT = 3000;
exports.app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use("/", Auth_routes_1.default);
exports.app.use("/", reservas_routes_1.reservaRouter);
exports.app.use("/orden", orden_routes_1.ordenRoute);
exports.app.use("/products", products_routes_1.ProductsRouter);
exports.app.use("/reservations", reservas_routes_1.reservaRouter);
exports.app.use("/admin", adminUser_routes_1.adminUserRoute);
exports.app.use("/admin", admin_routes_1.adminOrdenRoute);
exports.app.use("/admin", admin_routes_2.AdminReservaRoute);
exports.app.use("/admin", admin_routes_3.AdminAuthRoute);
exports.app.use("/", admin_routes_2.AdminReservaRoute);
exports.app.use(errorhandle_1.errorHandler);
exports.app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
