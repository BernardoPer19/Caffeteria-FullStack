// CategoriasModel.ts
import { pool } from "@/config/db/dbB";

export class CategoriasModel {
  static async findCategoryId(
    category: string
  ): Promise<{ categoria_id: number } | null> {
    try {
      const query = `SELECT categoria_id FROM categorias WHERE nombre = $1`;
      const values = [category]; 
      const categoriaResult = await pool.query(query, values);

      if (categoriaResult.rows.length === 0) return null;

      return categoriaResult.rows[0]; // Retorna solo el campo categoria_id
    } catch (error) {
      throw new Error("Error al encontrar la categoría");
    }
  }
}
