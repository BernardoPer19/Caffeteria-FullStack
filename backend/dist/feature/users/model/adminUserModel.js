"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUserModel = void 0;
// import { AdminUserType } from "../schema/userSchema";
const AuthRol_1 = require("@/feature/auth/model/AuthRol");
const dbB_1 = require("@/config/db/dbB");
class adminUserModel {
    static async eliminarAdminUser(user_id) {
        const query = "DELETE FROM users_tb WHERE user_id = $1";
        const result = await dbB_1.pool.query(query, [user_id]);
        if (result.rowCount === 0)
            return null;
        return { message: "Se eliminó el usuario con éxito" };
    }
    static async actualizarAdminUser(user_id, data) {
        const dataCopia = { ...data };
        if (dataCopia.rol) {
            const rol_id = await AuthRol_1.RolModel.getRol(dataCopia.rol);
            delete dataCopia.rol;
            dataCopia.rol_id = rol_id;
        }
        const keys = Object.keys(dataCopia);
        if (keys.length === 0) {
            throw new Error("No hay campos para actualizar");
        }
        const setters = keys
            .map((key, index) => `"${key}" = $${index + 1}`)
            .join(", ");
        const values = Object.values(dataCopia);
        const query = `UPDATE users_tb SET ${setters} WHERE user_id = $${keys.length + 1}`;
        const result = await dbB_1.pool.query(query, [...values, user_id]);
        if (result.rowCount === 0)
            return null;
        return { message: "Se actualizó con éxito" };
    }
}
exports.adminUserModel = adminUserModel;
_a = adminUserModel;
adminUserModel.obtenerTodosLosUsuarios = async (userNombreRol) => {
    const query = `SELECT u.user_id ,u.nombre , u.email, r.rol FROM users_tb u 
                          INNER JOIN roles_tb r ON u.rol_id  = r.rol_id
                          WHERE r.rol = $1;`;
    const { rows } = await dbB_1.pool.query(query, [userNombreRol]);
    return rows;
};
