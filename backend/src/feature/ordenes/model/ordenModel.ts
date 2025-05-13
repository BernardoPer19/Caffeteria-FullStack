import { connect } from "@/config/db/db.j";
import { OrdenData } from "../schema/ordenesSchema";
import { UserType } from "@/types/UserType";
import { OrdenFromDB, OrdenTypeFull } from "../types/ordenType";
import { userControl } from "./usuarioOrden";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export class ordeModel {
  static obtenerOrdenes = async (user_id: number): Promise<UserType[]> => {
    const query = `SELECT u.nombre AS nombre_user, p.nombre AS nombre_cafe, p.img,
         c.nombre AS categoria_cafe, p.precio, o.fecha_creacion AS fecha_orden,
         o.estado, o.total
          FROM ordenes_tb o
          INNER JOIN users_tb u ON o.user_id = u.user_id
          INNER JOIN productos_tb p ON o.cafe_id = p.cafe_id
          INNER JOIN categorias_tb c ON p.categoria_id = c.categoria_id
          WHERE o.user_id = $1;`;

    const [rows] = await connect.query(query, [user_id]);
    return rows as UserType[];
  };

  static crearOrden = async (
    ordenData: OrdenTypeFull
  ): Promise<OrdenFromDB[]> => {
    const { user, cafe } = ordenData;
    const user_id = await userControl.obtenerNombre(user);
    const cafe_id = await userControl.obtenerProductoNombre(cafe);

  
    console.log('ordenData:', ordenData);

    const query = `  INSERT INTO ordenes_tb(user_id, total, estado, fecha_creacion, direccion_orden, cantidad_productos, cafe_id)
                        VALUES($1, $2, 'pendiente', NOW(), $3, $4, $5)
                        RETURNING *;`;
    const values = [
      user_id,
      ordenData.total,
      ordenData.direccion_orden,
      ordenData.cantidad_productos,
      cafe_id,
    ];

      console.log(values);
    const [rows] = await connect.query(query, values);
    return rows as OrdenFromDB[];
  };

  static eliminarOrden = async (
    user_id: number,
    orden_id: number
  ): Promise<{ message: string } | null> => {
    const query = `DELETE FROM ordenes_tb WHERE orden_id = $1 AND user_id = $2`;
    const [rows] = await connect.query<ResultSetHeader>(query, [
      orden_id,
      user_id,
    ]);
    if (rows.affectedRows === 0) return null;

    return { message: "se elimino la orden  con exito" };
  };

  static actualizarOrden = async (
    user_id: number,
    orden_id: number,
    dataOrden: Partial<OrdenData>
  ): Promise<OrdenFromDB | null> => {
    const keys = Object.keys(dataOrden)
    const partes = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");
    const values = Object.values(dataOrden);
    if (partes.length === 0) {
      throw new Error("No fields to update");
    }
    const query =  `UPDATE ordenes_tb SET ${partes} WHERE orden_id = $${values.length + 1} AND user_id = $${values.length + 2} RETURNING *`;
    const [result] = await connect.query<ResultSetHeader>(query, [
      ...values,
      orden_id,
      user_id,
    ]);
    if (result.affectedRows === 0) return null;

    return await this.obtenerOrdenPorId(orden_id, user_id);
  };

  static obtenerOrdenPorId = async (
    orden_id: number,
    user_id: number
  ): Promise<OrdenFromDB | null> => {
    const [rows] = await connect.query<RowDataPacket[]>(
      `SELECT * FROM ordenes_tb WHERE orden_id = $1 AND user_id = $2`,
      [orden_id, user_id]
    );

    return (rows[0] as OrdenFromDB) ?? null;
  };
}
