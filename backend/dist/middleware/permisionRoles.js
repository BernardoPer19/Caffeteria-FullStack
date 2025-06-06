"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permisionRoles = void 0;
const permisionRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        const userRol = req.user?.rol;
        if (!userRol || !rolesPermitidos.includes(userRol)) {
            res
                .status(403)
                .json({ message: "No tienes permisos para acceder a esta ruta" });
        }
        next();
    };
};
exports.permisionRoles = permisionRoles;
