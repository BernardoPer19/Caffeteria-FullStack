
import { Router } from 'express';
import { AuthController2 } from '../../controller/AuthControllerJ';
import { verifyRoute } from '@/middleware/verify';
import { permisionRoles } from '@/middleware/permisionRoles';


const AuthRouter2 = Router();

AuthRouter2.post('/register', AuthController2.RegisterUser);
AuthRouter2.post('/login', AuthController2.loginUser);
// AuthRouter.post('/logout', logoutController);

AuthRouter2.get(
  "/protected",
  verifyRoute,
  permisionRoles("Admin"),
  AuthController2.protectedRoute
);


export default AuthRouter2;