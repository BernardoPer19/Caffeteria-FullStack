import { config } from "dotenv";
config();



export const DB_PORTS = Number(process.env.DB_PORTS) || 3306;
export const DB_USER = process.env.DB_USER || "root";
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PASSWORD = process.env.DB_PASSWORD || "mysqlcasa";
export const DB_DATABASE = process.env.DB_DATABASE || "cafeteria_db";

export const SALT_ROUNDS = process.env.SALT_ROUNDS ||10;
export const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY || " mi-poderosa-contraseña";


