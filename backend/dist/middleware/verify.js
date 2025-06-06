"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@/config/config");
const verifyRoute = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        if (!token) {
            res
                .status(401)
                .json({ message: "No autorizado: Token no proporcionado" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_PASSWORD);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido o expirado" });
    }
};
exports.verifyRoute = verifyRoute;
