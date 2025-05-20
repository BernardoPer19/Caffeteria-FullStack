import { pool } from "@/config/db/dbB";
import { Estado, Reserva, ReservaType } from "../types/reserva";

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

  static actualizarEstadoReserva = async (
    reserva_id: number,
    estado: Estado
  ): Promise<{ message: string } | null> => {
    const query = `
    UPDATE reservas_tb
    SET estado = $1
    WHERE reserva_id = $2
  `;
    const result = await pool.query(query, [estado, reserva_id]);
    if (result.rowCount === 0) return null;
    return { message: "Estado de la reserva actualizado exitosamente" };
  };
}
