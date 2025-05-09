import { Router } from "express";
import { AuthController } from "../../controller/AuthController";
import { verifyRoute } from "@/middleware/verify";
import { permisionRoles } from "@/middleware/permisionRoles";

const AuthRouter = Router();

AuthRouter.post("/register", AuthController.RegisterUser);
AuthRouter.post("/login", AuthController.loginUser);
AuthRouter.post("/logout", AuthController.logout);

AuthRouter.get(
  "/protected",
  verifyRoute,
  permisionRoles("Admin"),
  AuthController.protectedRoute
);

export default AuthRouter;
