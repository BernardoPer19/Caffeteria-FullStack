import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";
import { Router } from "express";

const AdminRoute = Router();

AdminRoute.get("/dashboard", () => {});


AdminRoute.post(
  "/register-admin",
  verifyRoute,
  permisionRoles("admin"),
  () => {}
);





AdminRoute.get(
  "/allUsers",
  verifyRoute,
  permisionRoles("admin"),
  () => {}
);
AdminRoute.post(
  "/allUsers",
  verifyRoute,
  permisionRoles("admin"),
  () => {}
);
AdminRoute.delete(
  "/allUsers/:id",
  verifyRoute,
  permisionRoles("admin"),
  () => {}
);
AdminRoute.put(
  "/allUsers",
  verifyRoute,
  permisionRoles("admin"),
  () => {}
);





AdminRoute.get(
  "/allEmployees",
  verifyRoute,
  permisionRoles("admin"),
  () => {}
);
AdminRoute.post(
  "/allEmployees",
  verifyRoute,
  permisionRoles("admin"),
  () => {}
);
AdminRoute.delete(
  "/allEmployees/:id",
  verifyRoute,
  permisionRoles("admin"),
  () => {}
);
AdminRoute.put(
  "/allEmployees",
  verifyRoute,
  permisionRoles("admin"),
  () => {}
);
