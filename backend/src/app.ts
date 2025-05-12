import express from "express";
import cookieParser from "cookie-parser";
import AuthRouter from "./feature/auth/routes/public/Auth.routes";
import { errorHandler } from "./middleware/errorhandle";

// importacion de reserva y admin
import { reservaRouter } from "./feature/reservations/routes/public/reservas.routes";
import { AdminReservaRoute } from "./feature/reservations/routes/private/admin/admin.routes";


//importacion de las ordenes
import { ordenRoute } from "./feature/ordenes/routes/public/orden.routes";

// para los users
import { adminUserRoute } from "./feature/users/routes/private/adminUser.routes";

// para el admin
import { adminRoute } from "./feature/ordenes/routes/private/admin/admin.routes";

//prueba despues lo borras esto
 //import AuthRouter2 from "./feature/auth/routes/public/Auth.routes";

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());

app.use("/", AuthRouter);
app.get("/", (_req, res) => {
  res.send("hi");  
});


// users admin 
app.use('/admin', adminUserRoute)

//ordenes user
app.use('/orden',ordenRoute)
// admin routes
app.use('/admin',adminRoute)

//reservas
app.use('/reserva',reservaRouter);
// admin prueba reservas
app.use('/admin',AdminReservaRoute);




//este se quita solo es  para probar el register  login en mysql 
 //app.use('/user',AuthRouter2);



 
// ❗️AQUÍ VA EL MIDDLEWARE DE ERRORES, DESPUÉS DE LAS RUTAS
app.use(errorHandler) ;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
