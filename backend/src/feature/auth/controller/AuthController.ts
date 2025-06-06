import { Request, Response, NextFunction, CookieOptions } from "express";
import { validateLogin, validateRegister } from "../schemas/AuthSchema";
import { catchAsync } from "../../../middleware/catchAsync";
import { AuthService } from "../services/AuthService";
import { UserType } from "../../../types/UserType";

export class AuthController {
  static RegisterUser = catchAsync(
    async (
      req: Request,
      res: Response<{ message: string; bienvenida?: string }>,
      _next: NextFunction
    ) => {
      const validatedData = validateRegister(req.body);

      console.log(validatedData);
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

      res
        .status(200)
        .cookie("access_token", token, options)
        .json({
          message: "El usuario inició sesión con éxito!",
          bienvenida: `Bienvenido!! ${validatedData.email}`,
        });
    }
  );

  static logout = (_req: Request, res: Response) => {
    try {
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "strict",
      });
      res.status(200).send({ message: "Sesión cerrada correctamente" });
    } catch (error) {
      res.status(500).send({ error: "Error al cerrar sesión" });
    }
  };

  static protectedRoute = (req: Request, res: Response) => {
    const user = req.user as UserType;

    if (!user) {
      res.json({ message: "Usted no esta Autorizado para ingresar acá" });
    }

    return res.status(200).json({ message: "Usuario autorizado", user });
  };

  static getCurrentUser = (req: Request, res: Response) => {
    try {
      const user = req.user;
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuario actual" });
    }
  };
}
