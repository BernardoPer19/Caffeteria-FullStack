import { pool } from "@/config/db/dbB";
import { Categoriasproductos } from "../types/productTypes";

export class CategoriasModel {
  static async findCategoryId(category: string): Promise<Categoriasproductos> {
    try {
      const query = `SELECT categoria_id FROM categorias WHERE nombre = $1`;
      const values = category;

      const categoriaResult = await pool.query(query, [values]);
      return categoriaResult.rows[0];
    } catch (error) {
      throw new Error("Error al crear un plan, coloca otro plan");
    }
  }
}
