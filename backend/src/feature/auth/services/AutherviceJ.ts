import { BadRequestError, NotFoundError, UnauthorizedError } from "@/Error";
import { AuthModel2 } from "../model/AuthModelJ";
import { comparePassword,createToken } from "../utils/authUtilsJ";
import { JwtPayload } from "jsonwebtoken";
import { RegisterType } from "../types/AuthTypes";

export class AuthService2 {
  static async loginUser(email: string, contraseña: string): Promise<string> {
    const user = await AuthModel2.verifyEmail(email);
    if (!user) {
      throw new NotFoundError("Email no encontrado");
    }

    const isPasswordValid = await comparePassword(contraseña, user.contraseña);
    if (!isPasswordValid) {
      throw new UnauthorizedError("Contraseña incorrecta");
    }

    const payload: JwtPayload = {
      user_id: user.user_id,
      nombre: user.nombre,
      email: user.email,
      fechaCreacion: user.fechaCreacion,
      rol: user.rol, 
    };

    const token = createToken(payload);
    return token;
  }

  static async registerUser(validateData: RegisterType, isAdmin: boolean) {
    const foundEmail = await AuthModel2.verifyEmail(validateData.email);
    if (foundEmail) {
      throw new BadRequestError(
        "Este email ya fue registrado, intente con otro o contacte con los administradores"
      );
    }

    const newUser = await AuthModel2.RegisterModel(validateData, isAdmin);
    return newUser;
  }
}
