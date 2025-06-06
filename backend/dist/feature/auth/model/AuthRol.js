"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolModel = void 0;
const dbB_1 = require("@/config/db/dbB");
class RolModel {
    static async getRol(rolName) {
        try {
            const query = `SELECT rol_id FROM roles_tb WHERE rol = $1`;
            const values = [rolName];
            const result = await dbB_1.pool.query(query, values);
            if (result.rows.length === 0) {
                throw new Error("Rol no encontrado");
            }
            return result.rows[0].rol_id;
        }
        catch (error) {
            throw new Error("Error al obtener el rol_id");
        }
    }
}
exports.RolModel = RolModel;
