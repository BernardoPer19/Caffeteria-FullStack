import { Router } from "express";

const AdminRoute = Router();

AdminRoute.get("/dashboard", () => {});

AdminRoute.get("/allUsers", () => {});
AdminRoute.post("/allUsers", () => {});
AdminRoute.delete("/allUsers/:id", () => {});
AdminRoute.put("/allUsers", () => {});

AdminRoute.get("/allEmployees", () => {});
AdminRoute.post("/allEmployees", () => {});
AdminRoute.delete("/allEmployees/:id", () => {});
AdminRoute.put("/allEmployees", () => {});
