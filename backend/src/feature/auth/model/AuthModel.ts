import { pool } from "../../../config/db/dbB";
import { QueryResult } from "pg";
import { RolModel } from "./AuthRol";
import { hashPassword } from "../utils/AuthUtil";
import { MixedUserType } from "../schemas/AuthSchema";
import { UserType } from "../../../types/UserType";

export class AuthModel {
  static async RegisterModel(
    newUser: MixedUserType,
    isAdmin: boolean
  ): Promise<UserType> {
    try {
      const rolName = isAdmin ? newUser.rol! : "usuario";
      const rolId = await RolModel.getRol(rolName);

      const query = `INSERT INTO public.users_tb(
                       email, nombre, "contraseña", "fechaCreacion", rol_id)
                     VALUES ($1, $2, $3, NOW(), $4) RETURNING *;`;

      const hashedPassword = await hashPassword(newUser.contraseña);
      const values = [newUser.email, newUser.nombre, hashedPassword, rolId];

      const result: QueryResult<UserType> = await pool.query(query, values);

      return result.rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error en la DB");
    }
  }

  static async verifyEmail(email: string) {
    try {
      const query = `
        SELECT u.*, r.rol
        FROM users_tb u
        JOIN roles_tb r ON u.rol_id = r.rol_id
        WHERE u.email = $1
      `;
      const result: QueryResult<UserType> = await pool.query(query, [email]);
      return result.rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error en la DB");
    }
  }
}
