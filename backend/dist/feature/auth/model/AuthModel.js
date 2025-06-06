"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = void 0;
const dbB_1 = require("@config/db/dbB");
const AuthRol_1 = require("./AuthRol");
const AuthUtil_1 = require("../utils/AuthUtil");
class AuthModel {
    static async RegisterModel(newUser, isAdmin) {
        try {
            const rolName = isAdmin ? newUser.rol : "usuario";
            const rolId = await AuthRol_1.RolModel.getRol(rolName);
            const query = `INSERT INTO public.users_tb(
                       email, nombre, "contraseña", "fechaCreacion", rol_id)
                     VALUES ($1, $2, $3, NOW(), $4) RETURNING *;`;
            const hashedPassword = await (0, AuthUtil_1.hashPassword)(newUser.contraseña);
            const values = [newUser.email, newUser.nombre, hashedPassword, rolId];
            const result = await dbB_1.pool.query(query, values);
            return result.rows[0];
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Error en la DB");
        }
    }
    static async verifyEmail(email) {
        try {
            const query = `
        SELECT u.*, r.rol
        FROM users_tb u
        JOIN roles_tb r ON u.rol_id = r.rol_id
        WHERE u.email = $1
      `;
            const result = await dbB_1.pool.query(query, [email]);
            return result.rows[0];
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Error en la DB");
        }
    }
}
exports.AuthModel = AuthModel;
