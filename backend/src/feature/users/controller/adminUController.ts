import { validatePartialUserByAdmin } from "../schema/userSchema";
import { adminUserModel } from "../model/adminUserModel";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@/middleware/catchAsync";
import { RolesType } from "../types/admin";

export class adminUserController {
  static getAllUserByRol = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const { rol } = req.query;
      if (typeof rol !== "string") {
        res
          .status(400)
          .json({ message: "La especialidad  debe ser un string" });
        return;
      }

      const result = await adminUserModel.obtenerTodosLosUsuarios(rol);
      res.status(200).json({
        status: "success",
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
      const vali = validatePartialUserByAdmin(req.body);
      console.log(req.body);

      const valiToUpdate: any = { ...vali };
      if (valiToUpdate.rol !== undefined) {
        valiToUpdate.rol = valiToUpdate.rol as RolesType;
      }

      const result = await adminUserModel.actualizarAdminUser(
        user_id,
        valiToUpdate
      );

      if (!result) {
        res.status(404).json({
          status: "fail",
          message: "No se encontró el usuario a actualizar",
        });
        return;
      }

      res.status(201).json({
        status: "success",
        data: result,
      });
    }
  );
}
//admin/user-management?rol=usuario
