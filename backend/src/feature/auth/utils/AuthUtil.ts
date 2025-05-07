import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "@/config/config";

const hashPassword = async (password: string) => {
  const hashedPassowrd = await bcrypt.hash(password, 10);
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
    JWT_PASSWORD,
    { expiresIn: "24h", algorithm: "ES256" }
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