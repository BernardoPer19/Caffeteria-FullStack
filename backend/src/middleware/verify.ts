import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config/config";
import { UserType } from "../types/UserType";

interface AuthenticatedRequest extends Request {
  user?: UserType;
}

export const verifyRoute = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.access_token;

    if (!token) {
      res
        .status(401)
        .json({ message: "No autorizado: Token no proporcionado" });
    }

    const decoded = jwt.verify(token, JWT_PASSWORD) as UserType;
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
