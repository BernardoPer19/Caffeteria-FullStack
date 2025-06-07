import { Router } from "express";
import { permisionRoles } from "../../../../../middleware/permisionRoles";
import { verifyRoute } from "../../../../../middleware/verify";
import { adminUserController } from "../../../controller/adminUController";
export const sharedUserRoutes = Router();

sharedUserRoutes.get('/user', verifyRoute, permisionRoles("admin", "empleado"), adminUserController.getAllUserByRol);
sharedUserRoutes.put('/user/:id', verifyRoute, permisionRoles("admin", "empleado"), adminUserController.updateUser);