"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControl = void 0;
const dbB_1 = require("@/config/db/dbB");
class userControl {
}
exports.userControl = userControl;
_a = userControl;
userControl.obtenerNombre = async (user) => {
    const query = "SELECT user_id FROM users_tb WHERE nombre = $1";
    const result = await dbB_1.pool.query(query, [
        user.nombre,
    ]);
    return result.rows[0]?.user_id;
};
userControl.obtenerProductoNombre = async (producto) => {
    const query = "SELECT cafe_id FROM productos_tb WHERE nombre = $1";
    const result = await dbB_1.pool.query(query, [
        producto.nombre,
    ]);
    return result.rows[0]?.cafe_id;
};
