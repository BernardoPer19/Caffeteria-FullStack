"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_PASSWORD = exports.SALTS_ROUNDS = exports.PORT_DB = exports.HOST_DB = exports.PASSWORD_DB = exports.DATABASE_DB = exports.USER_DB = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.USER_DB = process.env.USER_DB || "postgres";
exports.DATABASE_DB = process.env.DATABASE_DB || "railway";
exports.PASSWORD_DB = process.env.PASSWORD_DB || "RuvhVbpSYIDoWGWdrWMcJqvNngUFzWmx";
exports.HOST_DB = process.env.HOST_DB || "ballast.proxy.rlwy.net";
exports.PORT_DB = process.env.PORT_DB || 30804;
exports.SALTS_ROUNDS = process.env.SALTS_ROUNDS || 10;
exports.JWT_PASSWORD = process.env.JWT_PASSWORD || "contraseña_secreta_para_la_web";
