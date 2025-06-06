"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.planTrabajo = void 0;
const dbB_1 = require("@/config/db/dbB");
class planTrabajo {
}
exports.planTrabajo = planTrabajo;
_a = planTrabajo;
planTrabajo.controlIdPlan = async (nombrePlan) => {
    try {
        console.log("plan", nombrePlan);
        const query = `SELECT plan_id FROM planes_tb WHERE nombre = $1`;
        const values = [nombrePlan];
        const result = await dbB_1.pool.query(query, values);
        if (result.rows.length === 0) {
            throw new Error("No se encontró el id del tema");
        }
        return result.rows[0].plan_id;
    }
    catch (error) {
        throw new Error("Error al obtener el id del tema");
    }
};
