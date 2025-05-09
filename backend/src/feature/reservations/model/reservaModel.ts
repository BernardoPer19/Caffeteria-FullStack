import { pool } from "@/config/db/dbB";
import { Reserva, ReservaType } from "../types/reserva";

export class reservaModel {
  static obtenerReservas = async (user_id: number): Promise<Reserva[]> => {
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
      const result = await pool.query(query, values);
      return result.rows as Reserva[];
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error al obtener las reservas de usuario");
    }
  };

  static crearReservas = async (
    user_id: number,
    data: ReservaType
  ): Promise<string> => {
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

      const result = await pool.query(query, values);
      return result.rows[0].mensaje;
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error al crear la reserva");
    }
  };
}
