// services/AuthService.ts

import { BadRequestError, NotFoundError, UnauthorizedError } from "@/Error";
import { AuthModel } from "../model/AuthModel";
import { comparePassword, createToken } from "../utils/AuthUtil";
import { JwtPayload } from "jsonwebtoken";
import { RegisterType } from "../types/AuthTypes";

export class AuthService {
  static async loginUser(email: string, contraseña: string): Promise<string> {
    const user = await AuthModel.verifyEmail(email);
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
    const foundEmail = await AuthModel.verifyEmail(validateData.email);
    if (foundEmail) {
      throw new BadRequestError(
        "Este email ya fue registrado, intente con otro o contacte con los administradores"
      );
    }

    const newUser = await AuthModel.RegisterModel(validateData, isAdmin);
    return newUser;
  }
}
