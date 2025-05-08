import { pool } from "@/config/db/dbB";
import { ProductFromDB, ProductInput } from "../schemas/SchemaProduct";
import { CategoriasModel } from "./CategoriasModel";

export class ProductsModels {
  static async getProducts(): Promise<ProductFromDB[]> {
    const query = `SELECT * FROM productos`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async getProductById(id: number): Promise<ProductFromDB | null> {
    const query = `SELECT * FROM productos WHERE cafe_id = $1`;
    const result = await pool.query(query, [id]);

    return result.rows[0] ?? null;
  }
  static async createProduct(product: ProductInput): Promise<ProductFromDB> {
    const { nombre, descripcion, sabor, categoria, img, pais, precio } =
      product;

    const categoria_id = await CategoriasModel.ModelCategory(categoria);

    if (!categoria_id) {
      throw new Error("Categoría no encontrada");
    }

    const query = `
      INSERT INTO productos (
        nombre, descripcion, sabor, img, categoria_id,
        pais, precio
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      nombre,
      descripcion,
      sabor,
      img,
      categoria_id,
      pais,
      precio,
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async getProductByCategory(
    categoryName: string
  ): Promise<ProductFromDB[]> {
    const query = `
      SELECT 
        p.*
      FROM 
        productos p
      INNER JOIN categorias c ON p.categoria_id = c.categoria_id
      WHERE c.nombre = $1
    `;
    const result = await pool.query(query, [categoryName]);
    return result.rows;
  }

  static async deleteProduct(id: number): Promise<void> {
    const query = `DELETE FROM productos WHERE cafe_id = $1`;
    await pool.query(query, [id]);
  }

  static async updateProduct(
    id: number,
    product: Partial<ProductInput>
  ): Promise<ProductFromDB | null> {
    const fields = Object.keys(product)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");
    const values = Object.values(product);

    if (fields.length === 0) {
      throw new Error("No fields to update");
    }

    const query = `
        UPDATE productos
        SET ${fields}
        WHERE cafe_id = $1
        RETURNING *;
    `;

    const result = await pool.query(query, [id, ...values]);
    return result.rows[0] ?? null;
  }
}
