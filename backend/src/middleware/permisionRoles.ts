import { Roles, UserType } from "@/types/UserType";
import { NextFunction, Request, Response } from "express";

export const permisionRoles = (...rolesPermitidos: Roles[]) => {
  return (
    req: Request & { user?: UserType },
    res: Response,
    next: NextFunction
  ) => {
    const userRol = req.user?.rol;
    if (!userRol || !rolesPermitidos.includes(userRol)) {
      res
        .status(403)
        .json({ message: "No tienes permisos para acceder a esta ruta" });
    }
    next();
  };
};
