"use strict";
// db.ts
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordenModel = void 0;
const usuarioOrden_1 = require("./usuarioOrden");
const dbB_1 = require("@/config/db/dbB");
class ordenModel {
}
exports.ordenModel = ordenModel;
_a = ordenModel;
ordenModel.obtenerOrdenes = async (user_id) => {
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
    const result = await dbB_1.pool.query(query, [user_id]);
    return result.rows;
};
ordenModel.crearOrden = async (ordenData) => {
    const { user, cafe } = ordenData;
    const user_id = await usuarioOrden_1.userControl.obtenerNombre(user);
    const cafe_id = await usuarioOrden_1.userControl.obtenerProductoNombre(cafe);
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
    const result = await dbB_1.pool.query(query, values);
    return result.rows;
};
ordenModel.eliminarOrden = async (user_id, orden_id) => {
    const query = `DELETE FROM ordenes_tb WHERE orden_id = $1 AND user_id = $2`;
    const result = await dbB_1.pool.query(query, [orden_id, user_id]);
    if (result.rowCount === 0)
        return null;
    return { message: "Se eliminó la orden con éxito" };
};
ordenModel.actualizarOrden = async (user_id, orden_id, dataOrden) => {
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
    const result = await dbB_1.pool.query(query, [
        ...values,
        orden_id,
        user_id,
    ]);
    return result.rows[0] ?? null;
};
ordenModel.obtenerOrdenPorId = async (orden_id, user_id) => {
    const query = `SELECT * FROM ordenes_tb WHERE orden_id = $1 AND user_id = $2`;
    const result = await dbB_1.pool.query(query, [
        orden_id,
        user_id,
    ]);
    return result.rows[0] ?? null;
};
