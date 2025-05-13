import { Router } from "express";
import {adminUserController} from '@features/users/controller/adminUController';
import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";
export const sharedUserRoutes = Router();

sharedUserRoutes.get('/user',verifyRoute,permisionRoles("admin","empleado"),adminUserController.getAll);
sharedUserRoutes.put('/user/:id',verifyRoute,permisionRoles("admin","empleado"),adminUserController.updateUser);