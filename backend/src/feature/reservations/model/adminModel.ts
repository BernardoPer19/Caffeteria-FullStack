import { connect } from "@/config/db/db.j";
import { Reserva, ReservaType } from "../types/reserva";
import { ResultSetHeader } from "mysql2";

export class adminModel {
  static obtenerTodasLasReservas = async (): Promise<Reserva[]> => {
    const query = "SELECT * FROM reservas_tb";
    const [rows] = await connect.query(query);
    return rows as Reserva[];
  };

  static eliminarUnaReserva = async (
    reserva_id: number
  ): Promise<{ message: string } | null> => {
    const query = "DELETE FROM reservas_tb WHERE reserva_id = ?";
    const [rows] = await connect.query<ResultSetHeader>(query, [reserva_id]);
    if (rows.affectedRows === 0) {
      return null;
    }
    return { message: "se elimino la reserva con exito" };
  };

  static acualizarUnaReserva = async (
    reserva_id: number,
    data: ReservaType
  ): Promise<{ message: string } | null> => {
    const query = `UPDATE reservas_tb SET plan_id = ? , fecha_inicio = ?, fecha_fin = ? WHERE reserva_id = ?;`;
    const values = [
      data.plan_id,
      data.fecha_inicio,
      data.fecha_fin,
      reserva_id,
    ];
    const [rows] = await connect.query<ResultSetHeader>(query, values);
    if (rows.affectedRows === 0) {
      return null;
    }
    return { message: "se actualizo la reserva con exito" };
  };
}
