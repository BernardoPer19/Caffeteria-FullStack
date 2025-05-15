import { validateUserByAdmin } from "../schema/userSchema";
import { adminUserModel } from "../model/adminUserModel";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@/middleware/catchAsync";
import { AdminUserTypes } from "../types/admin";

export class adminUserController {
  static getAllUserByRol = catchAsync(
    async (
      req: Request,
      res: Response,
      _next: NextFunction
    ): Promise<void> => {
      const rol = req.params.query;
      const result = await adminUserModel.obtenerTodosLosUsuariosPorRol(rol);
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  );

  static addUser = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const vali = validateUserByAdmin(req.body);
      const result = await adminUserModel.agregarUsuarios(vali);
      res.status(201).json({
        status: "succes",
        data: result,
      });
    }
  );

  static deleteUser = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const user_id = +req.params.id;

      const result = await adminUserModel.eliminarAdminUser(user_id);
      res.status(201).json({
        status: "success",
        data: result,
      });
    }
  );

  static updateUser = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const user_id = +req.params.id;
      const vali = validateUserByAdmin(req.body);

      const result = await adminUserModel.actualizarAdminUser(user_id, {
        nombre: vali.nombre,
        email: vali.email,
        contraseña: vali.contraseña,
        rol: vali.rol,
      } as AdminUserTypes);
      res.status(201).json({
        status: "success",
        data: result,
      });
    }
  );
}
