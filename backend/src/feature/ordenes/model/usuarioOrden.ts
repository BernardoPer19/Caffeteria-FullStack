import { connect } from "@/config/db/db.j";
import { ProductTypes } from "@/feature/products/types/productTypes";
import { UserType } from "@/types/UserType";
import { RowDataPacket } from "mysql2";

export class userControl {
  static obtenerNombre = async (user: UserType) => {
    const query = "SELECT user_id FROM users_tb WHERE nombre = $1";
    const [rows] = await connect.query<RowDataPacket[]>(query, [user]);
    return rows[0];
  };

  static obtenerProductoNombre = async (producto: ProductTypes) => {
    const query = "SELECT cafe_id FROM productos_tb WHERE nombre = $1";
    const [rows] = await connect.query<RowDataPacket[]>(query, [producto]);
    return rows[0];
  };
}
