import { pool } from "@config/db/dbB";
import { RegisterType } from "../schemas/AuthSchema";
import { QueryResult } from "pg";
import { UserType } from "../types/AuthTypes";
import { RolModel } from "./AuthRol";
import { hashPassword } from "../utils/AuthUtil";

export class AuthModel {
  static async RegisterModel(
    newUser: RegisterType,
    isAdmin: boolean
  ): Promise<UserType> {
    try {
      //con el "newUser.rol!" aseguramos que el rol no sera undefinied o null
      const rolName = isAdmin ? newUser.rol! : "usuario";
      const rolId = await RolModel.getRol(rolName);

      const query = `INSERT INTO public.users_tb(
	                   user_id, email, nombre, "contraseña", "fechaCreacion", rol_id)
	                   VALUES (?, ?, ?, ?, ?, ?);`;
      const hashPassowrd = await hashPassword(newUser.contraseña);

      const values = [newUser.nombre, newUser.email, hashPassowrd, rolId];

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
      const query = `SELECT * FROM users_tb WHERE email = $1`;
      const value = email;
      const result: QueryResult<UserType> = await pool.query(query, [value]);
      return result.rows[0];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error en la DB");
    }
  }
}
