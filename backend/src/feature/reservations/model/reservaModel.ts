import { RowDataPacket } from "mysql2";
import { connect } from "@/config/db/db.j";
import { Reserva, ReservaType } from "../types/reserva";

export class reservaModel {
  static obtenerReservas = async (user_id: number): Promise<Reserva[]> => {
    try {
      const query = `SELECT u.nombre , p.descripcion, r.fecha_inicio,r.hora_cita,r.fecha_fin , r.estado FROM reservas_tb r
                        INNER JOIN users_tb u ON r.user_id = u.user_id
                        INNER JOIN planes_tb p ON r.plan_id = p.plan_id 
                        WHERE u.user_id = ?;`;
      const values = [user_id];
      const [rows] = await connect.query(query, values);
      return rows as Reserva[];
    } catch (error: any) {
      console.error(error.message);
      throw new Error("'error al obtener las reservas de usuario");
    }
  };

  static crearReservas = async (
    user_id: number,
    data: ReservaType
  ): Promise<string> => {
    try {
      console.log('datos' , data);
      
      const query = "CALL sp_crear_reserva(?,?,?,?,?,@mensaje)";
      const values = [user_id, data.plan_id, data.fecha_inicio,data.hora_cita, data.fecha_fin];
      await connect.query(query, values);
      const [[{ mensaje }]] = await connect.query<RowDataPacket[]>(
        "SELECT @mensaje AS mensaje"
      );
      return mensaje;
    } catch (error: any) {   
      console.error(error.message);
      throw new Error("'error al obtener las reservas de usuario");
    }
  };
}
