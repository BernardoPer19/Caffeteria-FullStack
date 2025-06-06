"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasModel = void 0;
// CategoriasModel.ts
const dbB_1 = require("@/config/db/dbB");
class CategoriasModel {
    static async findCategoryId(category) {
        try {
            const query = `SELECT categoria_id FROM categorias WHERE categoria = $1`;
            const values = [category];
            const categoriaResult = await dbB_1.pool.query(query, values);
            if (categoriaResult.rows.length === 0)
                return null;
            return categoriaResult.rows[0];
        }
        catch (error) {
            throw new Error("Error al encontrar la categoría");
        }
    }
}
exports.CategoriasModel = CategoriasModel;
