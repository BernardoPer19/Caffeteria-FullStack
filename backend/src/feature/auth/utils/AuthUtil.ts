import bcrypt from "bcrypt";
import { UserType } from "../types/AuthTypes";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "@/config/config";

const hashPassword = async (password: string) => {
  const hashedPassowrd = await bcrypt.hash(password, 10);
  return hashedPassowrd;
};

const comparePassword = async (password: string, hashPassword: string) => {
  const comparePassword = await bcrypt.compare(password, hashPassword);
  return comparePassword;
};

const createToken = (user: UserType): string => {
  const token = jwt.sign(
    {
      id: user.user_id,
      nombre: user.nombre,
      email: user.email,
      fechaCreacion: user.fechaCreacion,
      rol: user.rol,
    },
    JWT_PASSWORD,
    { expiresIn: "24h", algorithm: "ES256" }
  );
  return token;
};

export { hashPassword, comparePassword, createToken };
