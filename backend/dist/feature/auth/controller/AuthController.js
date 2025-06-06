"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthSchema_1 = require("../schemas/AuthSchema");
const catchAsync_1 = require("@/middleware/catchAsync");
const AuthService_1 = require("../services/AuthService");
class AuthController {
}
exports.AuthController = AuthController;
_a = AuthController;
AuthController.RegisterUser = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const validatedData = (0, AuthSchema_1.validateRegister)(req.body);
    console.log(validatedData);
    const isAdmin = !!validatedData.rol;
    const newUser = await AuthService_1.AuthService.registerUser(validatedData, isAdmin);
    res.status(201).json({
        message: "Usuario registrado exitosamente",
        bienvenida: `Bienvenido ${newUser.nombre}!!`,
    });
});
AuthController.loginUser = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const validatedData = (0, AuthSchema_1.validateLogin)(req.body);
    const token = await AuthService_1.AuthService.loginUser(validatedData.email, validatedData.contraseña);
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
    };
    res
        .status(200)
        .cookie("access_token", token, options)
        .json({
        message: "El usuario inició sesión con éxito!",
        bienvenida: `Bienvenido!! ${validatedData.email}`,
    });
});
AuthController.logout = (_req, res) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Asegúrate de que solo en producción se use secure
            sameSite: "strict",
        });
        res.status(200).send({ message: "Sesión cerrada correctamente" });
    }
    catch (error) {
        res.status(500).send({ error: "Error al cerrar sesión" });
    }
};
AuthController.protectedRoute = (req, res) => {
    const user = req.user;
    if (!user) {
        res.json({ message: "Usted no esta Autorizado para ingresar acá" });
    }
    return res.status(200).json({ message: "Usuario autorizado", user });
};
AuthController.getCurrentUser = (req, res) => {
    try {
        const user = req.user;
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener usuario actual" });
    }
};
