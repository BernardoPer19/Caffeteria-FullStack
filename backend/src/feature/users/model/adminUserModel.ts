import { AdminUserTypes, GetFiltroUserRol, PutAdminType } from "../types/admin";
// import { AdminUserType } from "../schema/userSchema";
import { RolModel } from "@/feature/auth/model/AuthRol";
import { pool } from "@/config/db/dbB";

export class adminUserModel {
  static obtenerTodosLosUsuarios = async  (userNombreRol : string):Promise<GetFiltroUserRol[]> => {
    const query = `SELECT u.user_id ,u.nombre , u.email, r.rol FROM users_tb u 
                          INNER JOIN roles_tb r ON u.rol_id  = r.rol_id
                          WHERE r.rol = $1;`;
    const {rows} = await pool.query(query,[userNombreRol]);
    return rows as AdminUserTypes[];
  };


  static async eliminarAdminUser(
    user_id: number
  ): Promise<{ message: string } | null> {
    const query = "DELETE FROM users_tb WHERE user_id = $1";
    const result = await pool.query(query, [user_id]);

    if (result.rowCount === 0) return null;
    return { message: "Se eliminó el usuario con éxito" };
  }

  static async actualizarAdminUser(
    user_id: number,
    data: Partial<PutAdminType>
  ): Promise<{ message: string } | null> {
    const dataCopia = { ...data };

    if (dataCopia.rol) {
      const rol_id = await RolModel.getRol(dataCopia.rol);
      delete dataCopia.rol;
      (dataCopia as any).rol_id = rol_id;
    }
    
    const keys = Object.keys(dataCopia);
    if (keys.length === 0) {
      throw new Error("No hay campos para actualizar");
    }

    const setters = keys
      .map((key, index) => `"${key}" = $${index + 1}`)
      .join(", ");
    const values = Object.values(dataCopia);

    const query = `UPDATE users_tb SET ${setters} WHERE user_id = $${
      keys.length + 1
    }`;
    const result = await pool.query(query, [...values, user_id]);

    if (result.rowCount === 0) return null;
    return { message: "Se actualizó con éxito" };
  }
}
