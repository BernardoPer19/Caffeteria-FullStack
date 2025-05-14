import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { SECRET_JWT_KEY,SALT_ROUNDS } from "@/config/dbConnection.j";

const hashPassword = async (password: string) => {
  const hashedPassowrd = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassowrd;
};

const comparePassword = async (password: string, hashPassword: string) => {
  const comparePassword = await bcrypt.compare(password, hashPassword);
  return comparePassword;
};

const createToken = (user: JwtPayload): string => {
  const token = jwt.sign(
    {
      user_id: user.user_id,
      nombre: user.nombre,
      email: user.email,
      fechaCreacion: user.fechaCreacion,
      rol: user.rol,
    },
    SECRET_JWT_KEY,
    { expiresIn: "24h"}
  );
  return token;
};

// const defaultCookieOptions: CookieOptions = {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === "production",
//   sameSite: "lax",
//   maxAge: 24 * 60 * 60 * 1000,
// };

export { hashPassword, comparePassword, createToken };