import { AuthController } from "@/feature/auth/controller/AuthController";
import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";
import { Router } from "express";

export const AdminAuthRoute = Router();

AdminAuthRoute.get("/dashboard", () => {});

AdminAuthRoute.post(
  "/register",
  verifyRoute,
  permisionRoles("admin"),
  AuthController.RegisterUser
);


