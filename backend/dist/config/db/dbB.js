"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.pool = void 0;
//coneccion DB
const pg_1 = __importDefault(require("pg"));
const config_1 = require("../config");
exports.pool = new pg_1.default.Pool({
    user: config_1.USER_DB,
    database: config_1.DATABASE_DB,
    password: config_1.PASSWORD_DB,
    host: config_1.HOST_DB,
    port: Number(config_1.PORT_DB),
});
const connectDB = async () => {
    try {
        await exports.pool.connect();
        console.log("Connected to the database successfully!");
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Failed to connect to the database:", error.message);
        }
        else {
            console.error("Unknown error:", error);
        }
    }
};
exports.connectDB = connectDB;
