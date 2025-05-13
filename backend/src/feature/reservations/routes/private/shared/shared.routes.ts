import { Router } from "express";
import { permisionRoles } from "@/middleware/permisionRoles";
import { verifyRoute } from "@/middleware/verify";

const SharedReservaRoutes = Router();

SharedReservaRoutes.get("/reservas", verifyRoute,permisionRoles("admin","empleado"),() => {});
SharedReservaRoutes.post("/reservas",verifyRoute,permisionRoles("admin","empleado"), () => {});

