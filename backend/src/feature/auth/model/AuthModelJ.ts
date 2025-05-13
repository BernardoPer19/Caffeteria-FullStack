import { connect } from "@/config/db/db.j";
import { UserType } from "@/types/UserType";
import { RolModel2 } from "./AuthRolJ";
import { hashPassword } from "../utils/authUtilsJ";
import { MixedUserType } from "../schemas/AuthSchema";
import { RowDataPacket } from "mysql2";

export class AuthModel2 {
  static async RegisterModel(newUser: MixedUserType, isAdmin: boolean): Promise<UserType> {
    try {
      const rolName = isAdmin ? newUser.rol! : "usuario";
      const rolId = await RolModel2.getRol(rolName);
      const query = `
        INSERT INTO users_tb (email, nombre, contraseña, fechaCreacion, rol_id)
        VALUES (?, ?, ?, NOW(), ?);`;

      const hashedPassword = await hashPassword(newUser.contraseña);
      const values = [newUser.email, newUser.nombre, hashedPassword, rolId];

      const [result]: any = await connect.query(query, values);
      
      const [userResult] = await connect.query<RowDataPacket[]>(
        `SELECT * FROM users_tb WHERE user_id = ?`,
        [result.insertId]
      );

      return userResult[0] as UserType;
    } catch (error: any) {
      throw new Error(error.message || "Error en la DB");
    }
  }

  static async verifyEmail(email: string) {
    try {
     
      const query = `SELECT * FROM users_tb WHERE email = ?`;
      const [result] = await connect.query<RowDataPacket[]>(query, [email]);
      return result[0] as UserType;
    } catch (error: any) {
      throw new Error(error.message || "Error en la DB");
    }
  }
}
