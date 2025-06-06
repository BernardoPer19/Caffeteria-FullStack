"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminModel = void 0;
const dbB_1 = require("@/config/db/dbB");
class adminModel {
}
exports.adminModel = adminModel;
_a = adminModel;
adminModel.obtenerTodasLasReservas = async () => {
    const query = "SELECT * FROM reservas_tb";
    const { rows } = await dbB_1.pool.query(query);
    return rows;
};
adminModel.eliminarUnaReserva = async (reserva_id) => {
    const query = "DELETE FROM reservas_tb WHERE reserva_id = $1";
    const result = await dbB_1.pool.query(query, [reserva_id]);
    if (result.rowCount === 0) {
        return null;
    }
    return { message: "se eliminó la reserva con éxito" };
};
adminModel.actualizarEstadoReserva = async (reserva_id, estado) => {
    const query = `
    UPDATE reservas_tb
    SET estado = $1
    WHERE reserva_id = $2
  `;
    const result = await dbB_1.pool.query(query, [estado, reserva_id]);
    if (result.rowCount === 0)
        return null;
    return { message: "Estado de la reserva actualizado exitosamente" };
};
