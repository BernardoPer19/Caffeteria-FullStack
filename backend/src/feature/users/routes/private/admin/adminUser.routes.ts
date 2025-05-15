import { Router } from "express";
import { adminUserController } from "@features/users/controller/adminUController";
import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";
export const adminUserRoute = Router();

adminUserRoute.get(
  "/user",verifyRoute,
  permisionRoles("admin"),
  adminUserController.getAllUserByRol
);
adminUserRoute.post(
  "/user",verifyRoute,
  permisionRoles("admin"),
  adminUserController.addUser
);
adminUserRoute.delete(
  "/user/:id",verifyRoute,
  permisionRoles("admin"),
  adminUserController.deleteUser
);
adminUserRoute.put(
  "/user/:id",verifyRoute,
  permisionRoles("admin"),
  adminUserController.updateUser
);
