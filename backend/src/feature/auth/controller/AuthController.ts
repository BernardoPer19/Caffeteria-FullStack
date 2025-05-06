import { Request, Response, NextFunction } from "express";
import { AuthModel } from "../model/AuthModel";
import { validateLogin, validateRegister } from "../schemas/AuthSchema";
import { catchAsync } from "@utils/catchAsync";
import { BadRequestError } from "@/Error";
import { UserType } from "../types/AuthTypes";

export class AuthController {
  static RegisterUser = catchAsync(
    async (
      req: Request,
      res: Response<{ message: string; data: UserType }>,
      _next: NextFunction
    ) => {
      const validateData = validateRegister(req.body);
      const isAdmin = !!validateData.rol;

      const foundEmail = await AuthModel.verifyEmail(validateData.email);
      if (foundEmail) {
        throw new BadRequestError(
          "Este email ya fue registrado, intente con otro o contacte con los administradores"
        );
      }

      const newUser = await AuthModel.RegisterModel(validateData, isAdmin);

      res.status(201).json({
        message: "Usuario registrado exitosamente",
        data: newUser,
      });
    }
  );


}
