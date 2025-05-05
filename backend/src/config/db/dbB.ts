//coneccion DB
import pg from "pg";
import { DATABASE_DB, HOST_DB, PASSWORD_DB, PORT_DB, USER_DB } from "../config";

export const pool = new pg.Pool({
  user: USER_DB,
  database: DATABASE_DB,
  password: PASSWORD_DB,
  host: HOST_DB,
  port: Number(PORT_DB),
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Connected to the database successfully!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Failed to connect to the database:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
};
