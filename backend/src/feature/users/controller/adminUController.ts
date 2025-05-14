import { validateUserByAdmin } from "../schema/userSchema";
import { AdminUserModel } from "../model/adminUserModel";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../../middleware/catchAsync";
import { AdminUserTypes } from "../types/admin";

export class adminUserController {
  static getAll = catchAsync(
    async (
      _req: Request,
      res: Response,
      _next: NextFunction
    ): Promise<void> => {
      const result = await AdminUserModel.obtenerTodosLosUsuarios();
      res.status(200).json({
        status: "success",
        data: result,
      });
    }
  );

  static addUser = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const vali = validateUserByAdmin(req.body);
      const result = await AdminUserModel.agregarUsuarios(vali);
      res.status(201).json({
        status: "succes",
        data: result,
      });
    }
  );

  static deleteUser = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const user_id = +req.params.id;

      const result = await AdminUserModel.eliminarAdminUser(user_id);
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

      const result = await AdminUserModel.actualizarAdminUser(user_id, {
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
