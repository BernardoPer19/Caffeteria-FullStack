"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.comparePassword = exports.hashPassword = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("@/config/config");
const hashPassword = async (password) => {
    const hashedPassowrd = await bcryptjs_1.default.hash(password, 10);
    return hashedPassowrd;
};
exports.hashPassword = hashPassword;
const comparePassword = async (password, hashPassword) => {
    const comparePassword = await bcryptjs_1.default.compare(password, hashPassword);
    return comparePassword;
};
exports.comparePassword = comparePassword;
const createToken = (user) => {
    const token = jsonwebtoken_1.default.sign({
        user_id: user.user_id,
        nombre: user.nombre,
        email: user.email,
        fechaCreacion: user.fechaCreacion,
        rol: user.rol,
    }, config_1.JWT_PASSWORD, { expiresIn: "24h" });
    return token;
};
exports.createToken = createToken;
