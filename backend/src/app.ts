import cors from "cors";
import express from "express";
import AuthRouter from "./feature/auth/routes/public/Auth.routes";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorhandle";

// importacion de reserva y admin
import { ordenRoute } from "./feature/ordenes/routes/public/orden.routes";
import { reservaRouter } from "./feature/reservations/routes/public/reservas.routes";
import { ProductsRouter } from "./feature/products/routes/products.routes";
import { adminUserRoute } from "./feature/users/routes/private/admin/adminUser.routes";
import { adminOrdenRoute } from "./feature/ordenes/routes/private/admin/admin.routes";
import { AdminReservaRoute } from "./feature/reservations/routes/private/admin/admin.routes";
//prueba despues lo borras esto
//import AuthRouter2 from "./feature/auth/routes/public/Auth.routes";

const app = express();
const PORT = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/", AuthRouter);
app.use("/", reservaRouter);

app.use("/orden", ordenRoute);
app.use("/products", ProductsRouter);
app.use("/reservations", reservaRouter);

app.use("/admin", adminUserRoute);
app.use("/admin", adminOrdenRoute);
app.use("/admin", AdminReservaRoute);
app.use("/admin", AdminReservaRoute);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
