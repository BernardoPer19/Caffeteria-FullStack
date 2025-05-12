import { Router } from "express";
import {adminUserController} from '@features/users/controller/adminUController'
export const adminUserRoute = Router();

adminUserRoute.get('/user',adminUserController.getAll);
adminUserRoute.post('/user',adminUserController.addUser);
adminUserRoute.delete('/user/:id',adminUserController.deleteUser);
adminUserRoute.put('/user/:id',adminUserController.updateUser);

