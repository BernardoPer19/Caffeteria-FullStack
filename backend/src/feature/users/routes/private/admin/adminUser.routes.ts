import { Router } from "express";
import { adminUserController } from "@features/users/controller/adminUController";
import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";
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
