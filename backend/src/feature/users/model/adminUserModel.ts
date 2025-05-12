import { connect } from "@/config/db/db.j";
import { AdminUserTypes, PutAdminType } from "../types/admin";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { AdminUserType } from "../schema/userSchema";
import { RolModel } from "@/feature/auth/model/AuthRol";

export class adminUserModel {
  static obtenerTodosLosUsuarios = async (): Promise<AdminUserTypes[]> => {
    const query = "SELECT * FROM users_tb";
    const [rows] = await connect.query(query);
    return rows as AdminUserTypes[];
  };

  static agregarUsuarios = async (
    data: AdminUserType
  ): Promise<AdminUserTypes> => {
    try {
      const { rol } = data;
      const rol_id = await RolModel.getRol(rol);

      const query = `
      INSERT INTO users_tb(nombre, email, contraseña, fechaCreacion, rol_id)
      VALUES(?, ?, ?, NOW(), ?);
    `;
      const values = [data.nombre, data.email, data.contraseña, rol_id];
      const [result] = await connect.query<ResultSetHeader>(query, values);
      const user_id = result.insertId;
      const [rows] = await connect.query<RowDataPacket[]>(
        "SELECT user_id, email, nombre, contraseña, fechaCreacion, rol_id FROM users_tb WHERE user_id = ?",
        [user_id]
      );

      const user = rows[0];
      return {
        ...user,
        rol: rol,
      } as AdminUserTypes;
    } catch (error: any) {
      throw new Error(error.message || "Error en la DB");
    }
  };

  static eliminarAdminUser = async (
    user_id: number
  ): Promise<{ message: string } | null> => {
    const query = "DELETE FROM users_tb WHERE user_id = ?";
    const [rows] = await connect.query<ResultSetHeader>(query, [user_id]);
    if (rows.affectedRows === 0) {
      return null;
    }
    return { message: "se elimino el usuario con exito" };
  };

  static actualizarAdminUser = async (
    user: number,
    data: Partial<PutAdminType>
  ): Promise<{ message: string } | null> => {
    const dataCopia = { ...data };

    if (dataCopia.rol) {
      const rol_id = await RolModel.getRol(dataCopia.rol);
      delete dataCopia.rol;
      (dataCopia as any).rol_id = rol_id;
    }

    const partes = Object.keys(dataCopia)
      .map((llaveOrden) => `\`${llaveOrden}\` = ?`)
      .join(", ");
    const values = Object.values(dataCopia);
    if (partes.length === 0) {
      throw new Error("no hay campos para actualizar");
    }

    const query = `UPDATE users_tb  SET ${partes} WHERE user_id = ?`;
    const [result] = await connect.query<ResultSetHeader>(query, [
      ...values,
      user,
    ]);

    if (result.affectedRows === 0) return null;
    return { message: "se actualizo con exito" };
  };
}
