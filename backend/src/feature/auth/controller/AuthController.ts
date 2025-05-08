import { Request, Response, NextFunction, CookieOptions } from "express";
import { validateLogin, validateRegister } from "../schemas/AuthSchema";
import { catchAsync } from "@utils/catchAsync";
import { AuthService } from "../services/AuthService";
import { UserType } from "@/types/UserType";

export class AuthController {
  static RegisterUser = catchAsync(
    async (
      req: Request,
      res: Response<{ message: string; bienvenida?: string }>,
      _next: NextFunction
    ) => {
      const validatedData = validateRegister(req.body);
      const isAdmin = !!validatedData.rol;

      const newUser = await AuthService.registerUser(validatedData, isAdmin);

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        bienvenida: `Bienvenido ${newUser.nombre}!!`,
      });
    }
  );

  static loginUser = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const validatedData = validateLogin(req.body);

      const token = await AuthService.loginUser(
        validatedData.email,
        validatedData.contraseña
      );

      const options: CookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000,
      };

      res.status(200).cookie("access_token", token, options).json({
        message: "El usuario inició sesión con éxito!",
        welcomeMessage: `Bienvenido!! ${validatedData.email}`,
      });
    }
  );

  static logout = (_req: Request, res: Response) => {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
  };

  static protectedRoute = (req: Request, res: Response) => {
    const user = req.user as UserType;
    console.log(user.rol);
    
    if (!user) {
      res.json({ message: "Usted no esta Autorizado para ingresar acá" });
    }

    return res.status(200).json({ message: "Usuario autorizado", user });
  };
}
