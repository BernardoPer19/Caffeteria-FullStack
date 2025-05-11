import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";
import { Router } from "express";

const AdminRoute = Router();

AdminRoute.get("/dashboard", () => {});


AdminRoute.post(
  "/register-admin",
  verifyRoute,
  permisionRoles("Admin"),
  () => {}
);



AdminRoute.get(
  "/allUsers",
  verifyRoute,
  permisionRoles("Admin"),
  () => {}
);
AdminRoute.post(
  "/allUsers",
  verifyRoute,
  permisionRoles("Admin"),
  () => {}
);
AdminRoute.delete(
  "/allUsers/:id",
  verifyRoute,
  permisionRoles("Admin"),
  () => {}
);
AdminRoute.put(
  "/allUsers",
  verifyRoute,
  permisionRoles("Admin"),
  () => {}
);

AdminRoute.get(
  "/allEmployees",
  verifyRoute,
  permisionRoles("Admin"),
  () => {}
);
AdminRoute.post(
  "/allEmployees",
  verifyRoute,
  permisionRoles("Admin"),
  () => {}
);
AdminRoute.delete(
  "/allEmployees/:id",
  verifyRoute,
  permisionRoles("Admin"),
  () => {}
);
AdminRoute.put(
  "/allEmployees",
  verifyRoute,
  permisionRoles("Admin"),
  () => {}
);
