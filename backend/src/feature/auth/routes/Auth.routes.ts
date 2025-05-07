import { Router } from 'express';
import { AuthController } from '../controller/AuthController';

const AuthRouter = Router();

AuthRouter.post('/register', AuthController.RegisterUser);
AuthRouter.post('/login', AuthController.loginUser);
// AuthRouter.post('/logout', logoutController);

// AuthRouter.get('/protected', authenticateToken, protectedController);

export default AuthRouter;