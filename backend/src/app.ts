import express from "express";
import cookieParser from "cookie-parser";
import AuthRouter from "./feature/auth/routes/public/Auth.routes";
import { errorHandler } from "./middleware/errorhandle";

// importacion de reserva y admin
import { reservaRouter } from "./feature/reservations/routes/public/reservas.routes";
import { AdminReservaRoute } from "./feature/reservations/routes/private/admin/admin.routes";
import { ProductsRouter } from "./feature/products/routes/products.routes";
import cors from "cors";
//prueba despues lo borras esto
// import AuthRouter2 from "./feature/auth/routes/public/Auth.routes";

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
app.use("/admin", AdminReservaRoute);
app.use("/products", ProductsRouter);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
