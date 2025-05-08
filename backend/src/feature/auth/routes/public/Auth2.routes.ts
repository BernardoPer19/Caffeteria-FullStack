
import { Router } from 'express';
import { AuthController2 } from '../../controller/AuthControllerJ';


const AuthRouter2 = Router();

AuthRouter2.post('/register', AuthController2.RegisterUser);
AuthRouter2.post('/login', AuthController2.loginUser);
// AuthRouter.post('/logout', logoutController);

// AuthRouter.get('/protected', authenticateToken, protectedController);

export default AuthRouter2;