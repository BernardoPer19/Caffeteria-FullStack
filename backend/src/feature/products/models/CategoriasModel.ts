import { pool } from "@/config/db/dbB";

export class CategoriasModel {
  static async ModelCategory(category: string) {
    const query = `SELECT categoria_id FROM categorias WHERE nombre = $1`;
    const values = category;

    const categoriaResult = await pool.query(query, [values]);
    return categoriaResult.rows[0];
  }
}
