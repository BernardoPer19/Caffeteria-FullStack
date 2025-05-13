import { Request, Response, NextFunction } from "express";
import { catchAsync } from "@/middleware/catchAsync";
import { ordeModel } from "../model/ordenModel";
import { validateOrden } from "../schema/ordenesSchema";
import { OrdenTypeFull } from "../types/ordenType";

export class ordenController {
  static obtenerOrdenes = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user = req.user.user_id;
      const ordenUser = await ordeModel.obtenerOrdenes(user);
      res.status(200).json({
        status: "success",
        data: ordenUser,
      });
    }
  );

  static crearOrden = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const vali = validateOrden(req.body);
      const orden = await ordeModel.crearOrden({
        user: vali.user,
        cafe: vali.cafe,
        direccion_orden: vali.direccion_orden,
        cantidad_productos: vali.cantidad_productos,
      } as OrdenTypeFull);
      res.status(201).json({
        status: "success",
        data: orden,
      });
    }
  );

  static eliminarOrden = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user = req.user.user_id;
      const ordenes = +req.params.id;

      const orden = await ordeModel.eliminarOrden(user, ordenes);
      res.status(201).json({
        status: "success",
        data: orden,
      });
    }
  );

  static actualizarOrden = catchAsync(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user = req.user.user_id;
      const orden = +req.params.id;
      const vali = validateOrden(req.body);

      const ordenUser = await ordeModel.actualizarOrden(user, orden, {
        user: vali.user,
        cafe: vali.cafe,
        direccion_orden: vali.direccion_orden,
        cantidad_productos: vali.cantidad_productos,
      });

       res.status(201).json({
        status: "success",
        data: ordenUser,
      });
    }
  );
}
