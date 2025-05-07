import dotenv from "dotenv";
dotenv.config();

export const USER_DB = process.env.USER_DB || "postgres";
export const DATABASE_DB = process.env.DATABASE_DB || "Caffeteria_db";
export const PASSWORD_DB = process.env.PASSWORD_DB || "mysqlcasa";
export const HOST_DB = process.env.HOST_DB || "localhost";
export const PORT_DB = process.env.PORT_DB || 5432;

export const SALTS_ROUNDS = process.env.SALTS_ROUNDS || 10;
export const JWT_PASSWORD =
  process.env.JWT_PASSWORD || "contraseña_secreta_para_la_web";
