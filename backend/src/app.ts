import express from "express";
import cookieParser from "cookie-parser";
import AuthRouter from "./feature/auth/routes/Auth.routes";
import { errorHandler } from "./middleware/errorhandle";

const app = express();
const PORT = 3000;

// Middlewares primero
app.use(cookieParser());
app.use(express.json());

// Rutas después
app.use("/", AuthRouter);
app.get("/", (_req, res) => {
  res.send("hi");
});

// ❗️AQUÍ VA EL MIDDLEWARE DE ERRORES, DESPUÉS DE LAS RUTAS
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
