import { pool } from "@/config/db/dbB";
import { ProductInput } from "../schemas/SchemaProduct";
import { CategoriasModel } from "./CategoriasModel";
import { ProductTypes } from "../types/productTypes";

export class ProductsModel {
  static async findAll(): Promise<ProductTypes[]> {
    const query = ` 
    SELECT p.nombre, p.descripcion, p.sabor, p.img, c.categoria, p.pais, p.precio 
      FROM productos p 
    INNER JOIN categorias c ON p.categoria_id = c.categoria_id`;
    const result = await pool.query(query);
    return result.rows;
  }

  static async findById(productId: number): Promise<ProductTypes | null> {
    const query = `
    SELECT p.nombre, p.descripcion, p.sabor, p.img, c.categoria, p.pais, p.precio 
      FROM productos p 
      INNER JOIN categorias c ON p.categoria_id = c.categoria_id
    
      WHERE cafe_id = $1`;
    const result = await pool.query(query, [productId]);
    return result.rows[0] ?? null;
  }

  static async create(product: ProductInput): Promise<ProductTypes> {
    const { nombre, descripcion, sabor, categoria, img, pais, precio } =
      product;

    const categoriaIdResult = await CategoriasModel.findCategoryId(categoria);
    if (!categoriaIdResult) throw new Error("Categoría no encontrada");

    const categoriaId = categoriaIdResult.categoria_id;

    const query = `
      INSERT INTO productos (
        nombre, descripcion, sabor, img, categoria_id, pais, precio
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [nombre, descripcion, sabor, img, categoriaId, pais, precio];
    const result = await pool.query(query, values);

    return result.rows[0];
  }

  static async findByCategory(categoria: string): Promise<ProductTypes[]> {
    const query = `
      SELECT p.*
      FROM productos p
      INNER JOIN categorias c ON p.categoria_id = c.categoria_id
      WHERE c.nombre = $1
    `;
    const result = await pool.query(query, [categoria]);
    return result.rows;
  }

  static async delete(productId: number): Promise<void> {
    const query = `DELETE FROM productos WHERE cafe_id = $1`;
    await pool.query(query, [productId]);
  }

  static async update(
    productId: number,
    updates: Partial<ProductInput>
  ): Promise<ProductTypes | null> {
    const fields = Object.keys(updates)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(", ");

    if (!fields) throw new Error("No hay campos para actualizar");

    const values = Object.values(updates);
    const query = `
      UPDATE productos
      SET ${fields}
      WHERE cafe_id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [productId, ...values]);
    return result.rows[0] ?? null;
  }
}
