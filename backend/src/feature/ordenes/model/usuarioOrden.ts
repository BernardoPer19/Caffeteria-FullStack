import { pool } from "@/config/db/dbB";
import { ProductTypes } from "@/feature/products/types/productTypes";
import { UserType } from "@/types/UserType";
import { QueryResult } from "pg";

export class userControl {
  static obtenerNombre = async (user: UserType) => {
    const query = "SELECT user_id FROM users_tb WHERE nombre = $1";
    const result: QueryResult<{ user_id: number }> = await pool.query(query, [
      user.nombre,
    ]);
    return result.rows[0]?.user_id;
  };

  static obtenerProductoNombre = async (producto: ProductTypes) => {
    const query = "SELECT cafe_id FROM productos_tb WHERE nombre = $1";
    const result: QueryResult<{ cafe_id: number }> = await pool.query(query, [
      producto.nombre,
    ]);
    return result.rows[0]?.cafe_id;
  };
}
