import express from "express";
import cookieParser from "cookie-parser";
import AuthRouter from "./feature/auth/routes/public/Auth.routes";
import { errorHandler } from "./middleware/errorhandle";

// importacion de reserva y admin
import { reservaRouter } from "./feature/reservations/routes/public/reservas.routes";
import { AdminReservaRoute } from "./feature/reservations/routes/private/admin/admin.routes";

//prueba despues lo borras esto
// import AuthRouter2 from "./feature/auth/routes/public/Auth.routes";

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());

app.use("/", AuthRouter);

app.use('/',reservaRouter);
app.use('/admin',AdminReservaRoute);




// ❗️AQUÍ VA EL MIDDLEWARE DE ERRORES, DESPUÉS DE LAS RUTAS
app.use(errorHandler) ;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
