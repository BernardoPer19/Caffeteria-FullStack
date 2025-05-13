import axios from "../../../utils/axios";
import { AxiosError } from "axios";
import type { ReservaType } from "../types/ReservationsTypes";

// Manejo de errores centralizado
const handleRequestError = (
  error: unknown,
  fallback = "Error desconocido."
) => {
  if (error instanceof AxiosError && error.response) {
    const backendMessage = error.response.data?.errors || error.message;
    throw new Error(backendMessage);
  }
  throw new Error(fallback);
};

export const getAllReservationsRequest = async (): Promise<ReservaType[]> => {
  try {
    const response = await axios.get<ReservaType[]>("/admin/reservations");
    return response.data;
  } catch (error) {
    throw handleRequestError(error, "No se pudieron obtener las reservas.");
  }
};

export const deleteReservations = async (
  reservaId: number
): Promise<number> => {
  try {
    const response = await axios.delete<number>("/admin/reservations", {
      data: { id: reservaId },
    });

    return response.data; 
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al eliminar la reserva.");
  }
};
