import { pool } from "@/config/db/dbB";
import { Reserva, ReservaType } from "../types/reserva";

export class adminModel {
  static obtenerTodasLasReservas = async (): Promise<Reserva[]> => {
    const query = "SELECT * FROM reservas_tb";
    const { rows } = await pool.query(query);
    return rows as Reserva[];
  };

  static eliminarUnaReserva = async (
    reserva_id: number
  ): Promise<{ message: string } | null> => {
    const query = "DELETE FROM reservas_tb WHERE reserva_id = $1";
    const result = await pool.query(query, [reserva_id]);
    if (result.rowCount === 0) {
      return null;
    }
    return { message: "se eliminó la reserva con éxito" };
  };

  static acualizarUnaReserva = async (
    reserva_id: number,
    data: ReservaType
  ): Promise<{ message: string } | null> => {
    const query = `
      UPDATE reservas_tb
      SET plan_id = $1, fecha_inicio = $2, fecha_fin = $3
      WHERE reserva_id = $4
    `;
    const values = [
      data.plan_id,
      data.fecha_inicio,
      data.fecha_fin,
      reserva_id,
    ];
    const result = await pool.query(query, values);
    if (result.rowCount === 0) {
      return null;
    }
    return { message: "se actualizó la reserva con éxito" };
  };
}
