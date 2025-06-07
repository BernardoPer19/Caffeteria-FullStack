// db.ts

// ordenModel.ts
import { OrdenData } from "../schema/ordenesSchema";
import { OrdenFromDB, OrdenTypeFull } from "../types/ordenType";
import { userControl } from "./usuarioOrden";
import { QueryResult } from "pg";
import { pool } from "../../../config/db/dbB";
import { UserType } from "../../../types/UserType";

export class ordenModel {
  static obtenerOrdenes = async (user_id: number): Promise<UserType[]> => {

    const query = `
      SELECT u.nombre AS nombre_user, p.nombre AS nombre_cafe, p.img,
             c.nombre AS categoria_cafe, p.precio, o.fecha_creacion AS fecha_orden,
             o.estado, o.total
      FROM ordenes_tb o
      INNER JOIN users_tb u ON o.user_id = u.user_id
      INNER JOIN productos_tb p ON o.cafe_id = p.cafe_id
      INNER JOIN categorias_tb c ON p.categoria_id = c.categoria_id
      WHERE o.user_id = $1;
    `;

    const result: QueryResult<UserType> = await pool.query(query, [user_id]);
    return result.rows;
  };

  static crearOrden = async (
    ordenData: OrdenTypeFull
  ): Promise<OrdenFromDB[]> => {
    const { user, cafe } = ordenData;
    const user_id = await userControl.obtenerNombre(user);
    const cafe_id = await userControl.obtenerProductoNombre(cafe);

    const query = `
      INSERT INTO ordenes_tb(user_id, total, estado, fecha_creacion, direccion_orden, cantidad_productos, cafe_id)
      VALUES ($1, $2, 'pendiente', NOW(), $3, $4, $5)
      RETURNING *;
    `;
    const values = [
      user_id,
      ordenData.total,
      ordenData.direccion_orden,
      ordenData.cantidad_productos,
      cafe_id,
    ];

    const result: QueryResult<OrdenFromDB> = await pool.query(query, values);
    return result.rows;
  };

  static eliminarOrden = async (
    user_id: number,
    orden_id: number
  ): Promise<{ message: string } | null> => {
    const query = `DELETE FROM ordenes_tb WHERE orden_id = $1 AND user_id = $2`;
    const result = await pool.query(query, [orden_id, user_id]);

    if (result.rowCount === 0) return null;
    return { message: "Se eliminó la orden con éxito" };
  };

  static actualizarOrden = async (
    user_id: number,
    orden_id: number,
    dataOrden: Partial<OrdenData>
  ): Promise<OrdenFromDB | null> => {
    const keys = Object.keys(dataOrden);
    const partes = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");
    const values = Object.values(dataOrden);

    if (values.length === 0) {
      throw new Error("No fields to update");
    }

    const query = `
      UPDATE ordenes_tb
      SET ${partes}
      WHERE orden_id = $${values.length + 1} AND user_id = $${values.length + 2}
      RETURNING *;
    `;

    const result: QueryResult<OrdenFromDB> = await pool.query(query, [
      ...values,
      orden_id,
      user_id,
    ]);

    return result.rows[0] ?? null;
  };

  static obtenerOrdenPorId = async (
    orden_id: number,
    user_id: number
  ): Promise<OrdenFromDB | null> => {
    const query = `SELECT * FROM ordenes_tb WHERE orden_id = $1 AND user_id = $2`;
    const result: QueryResult<OrdenFromDB> = await pool.query(query, [
      orden_id,
      user_id,
    ]);

    return result.rows[0] ?? null;
  };
}
