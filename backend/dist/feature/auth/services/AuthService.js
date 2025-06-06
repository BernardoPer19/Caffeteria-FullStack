"use strict";
// services/AuthService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const Error_1 = require("@/Error");
const AuthModel_1 = require("../model/AuthModel");
const AuthUtil_1 = require("../utils/AuthUtil");
class AuthService {
    static async loginUser(email, contraseña) {
        const user = await AuthModel_1.AuthModel.verifyEmail(email);
        if (!user) {
            throw new Error_1.NotFoundError("Email no encontrado");
        }
        const isPasswordValid = await (0, AuthUtil_1.comparePassword)(contraseña, user.contraseña);
        if (!isPasswordValid) {
            throw new Error_1.UnauthorizedError("Contraseña incorrecta");
        }
        const payload = {
            user_id: user.user_id,
            nombre: user.nombre,
            email: user.email,
            fechaCreacion: user.fechaCreacion,
            rol: user.rol,
        };
        const token = (0, AuthUtil_1.createToken)(payload);
        return token;
    }
    static async registerUser(validateData, isAdmin) {
        const foundEmail = await AuthModel_1.AuthModel.verifyEmail(validateData.email);
        if (foundEmail) {
            throw new Error_1.BadRequestError("Este email ya fue registrado, intente con otro o contacte con los administradores");
        }
        const newUser = await AuthModel_1.AuthModel.RegisterModel(validateData, isAdmin);
        return newUser;
    }
}
exports.AuthService = AuthService;
