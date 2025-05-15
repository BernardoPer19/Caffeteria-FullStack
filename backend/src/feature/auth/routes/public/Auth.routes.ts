import { Router } from "express";
import { AuthController } from "../../controller/AuthController";
import { verifyRoute } from "@/middleware/verify";

const AuthRouter = Router();

AuthRouter.post("/register", AuthController.RegisterUser);
AuthRouter.post("/login", AuthController.loginUser);
AuthRouter.post("/logout", AuthController.logout);

AuthRouter.get("/protected", verifyRoute, AuthController.protectedRoute);

AuthRouter.get("/", verifyRoute, AuthController.getCurrentUser);

export default AuthRouter;
