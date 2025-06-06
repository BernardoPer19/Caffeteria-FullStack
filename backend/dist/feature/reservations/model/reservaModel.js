"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservaModel = void 0;
const dbB_1 = require("@/config/db/dbB");
class reservaModel {
}
exports.reservaModel = reservaModel;
_a = reservaModel;
reservaModel.obtenerReservas = async (user_id) => {
    try {
        const query = `
        SELECT 
          u.nombre, 
          p.descripcion, 
          r.fecha_inicio, 
          r.hora_cita, 
          r.fecha_fin, 
          r.estado 
        FROM reservas_tb r
        INNER JOIN users_tb u ON r.user_id = u.user_id
        INNER JOIN planes_tb p ON r.plan_id = p.plan_id 
        WHERE u.user_id = $1;
      `;
        const values = [user_id];
        const result = await dbB_1.pool.query(query, values);
        return result.rows;
    }
    catch (error) {
        console.error(error.message);
        throw new Error("Error al obtener las reservas de usuario");
    }
};
reservaModel.crearReservas = async (user_id, data) => {
    try {
        console.log("datos", data);
        const query = `SELECT sp_crear_reserva($1, $2, $3, $4, $5) AS mensaje`;
        const values = [
            user_id,
            data.plan_id,
            data.fecha_inicio,
            data.hora_cita,
            data.fecha_fin,
        ];
        const result = await dbB_1.pool.query(query, values);
        return result.rows[0].mensaje;
    }
    catch (error) {
        console.error(error.message);
        throw new Error("Error al crear la reserva");
    }
};
