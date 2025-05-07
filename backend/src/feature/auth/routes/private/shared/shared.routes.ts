import { Router } from "express";

const SharedRoutes = Router();

SharedRoutes.get("/products", () => {});
SharedRoutes.get("/orders", () => {});
SharedRoutes.get("/reservations", () => {});
