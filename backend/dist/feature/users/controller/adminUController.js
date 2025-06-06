"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUserController = void 0;
const userSchema_1 = require("../schema/userSchema");
const adminUserModel_1 = require("../model/adminUserModel");
const catchAsync_1 = require("@/middleware/catchAsync");
class adminUserController {
}
exports.adminUserController = adminUserController;
_a = adminUserController;
adminUserController.getAllUserByRol = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const { rol } = req.query;
    if (typeof rol !== "string") {
        res
            .status(400)
            .json({ message: "La especialidad  debe ser un string" });
        return;
    }
    const result = await adminUserModel_1.adminUserModel.obtenerTodosLosUsuarios(rol);
    res.status(200).json({
        status: "success",
        data: result,
    });
});
adminUserController.deleteUser = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const user_id = +req.params.id;
    const result = await adminUserModel_1.adminUserModel.eliminarAdminUser(user_id);
    res.status(201).json({
        status: "success",
        data: result,
    });
});
adminUserController.updateUser = (0, catchAsync_1.catchAsync)(async (req, res, _next) => {
    const user_id = +req.params.id;
    const vali = (0, userSchema_1.validatePartialUserByAdmin)(req.body);
    console.log(req.body);
    const valiToUpdate = { ...vali };
    if (valiToUpdate.rol !== undefined) {
        valiToUpdate.rol = valiToUpdate.rol;
    }
    const result = await adminUserModel_1.adminUserModel.actualizarAdminUser(user_id, valiToUpdate);
    if (!result) {
        res.status(404).json({
            status: "fail",
            message: "No se encontró el usuario a actualizar",
        });
        return;
    }
    res.status(201).json({
        status: "success",
        data: result,
    });
});
//admin/user-management?rol=usuario
