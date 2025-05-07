import { NextFunction, Request } from "express";
import { UserType } from "../types/AuthTypes";
import { BadRequestError, NotFoundError } from "@/Error";

import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "@/config/config";

export const verifyRoute = (
  req: Request,
  res: Response & { user?: UserType },
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      throw new NotFoundError("EL token no es valido o no fue autorizado");
    }

    const decoded = jwt.verify(token, JWT_PASSWORD) as UserType;
    req.user = decoded;

    next();
  } catch (error) {
    throw new BadRequestError("Token no valido o expirado");
  }
};
