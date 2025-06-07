import { Router } from "express";
import { verifyRoute } from "../../../../../middleware/verify";
import { permisionRoles } from "../../../../../middleware/permisionRoles";
import { adminUserController } from "../../../controller/adminUController";

export const adminUserRoute = Router();

adminUserRoute.get(
  "/user-management",
  verifyRoute,
  permisionRoles("admin"),
  adminUserController.getAllUserByRol
);

adminUserRoute.delete(
  "/user-management/:id",
  verifyRoute,
  permisionRoles("admin"),
  adminUserController.deleteUser
);

adminUserRoute.put(
  "/user-management/:id",
  verifyRoute,
  permisionRoles("admin"),
  adminUserController.updateUser
);
