import axios from "../../../utils/axios";
import { AxiosError } from "axios";
import type {
  NuevaReservaInput,
  ReservaType,
} from "../types/ReservationsTypes";

export const getReservasUsuario = async (): Promise<ReservaType[]> => {
  try {
    const response = await axios.get<ReservaType[]>("/reservations");
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al obtener productos.");
  }
};

export const postReservationsRequest = async (data: NuevaReservaInput) => {
  try {
    const response = await axios.post<ReservaType>("/reservations", data);
    console.log(response.data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al registrar la reserva.");
  }
};
