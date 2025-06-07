import { pool } from "../../../config/db/dbB";

export class planTrabajo {
  static controlIdPlan = async (nombrePlan: string): Promise<number> => {
    try {
      console.log("plan", nombrePlan);

      const query = `SELECT plan_id FROM planes_tb WHERE nombre = $1`;
      const values = [nombrePlan];

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        throw new Error("No se encontró el id del tema");
      }

      return result.rows[0].plan_id;
    } catch (error) {
      throw new Error("Error al obtener el id del tema");
    }
  };
}
