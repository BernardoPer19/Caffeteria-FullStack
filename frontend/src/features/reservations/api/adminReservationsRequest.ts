import axios from "../../../utils/axios";
import { AxiosError } from "axios";
import type {
  ReservaType,
  UpdateEstadoReservaPayload,
} from "../types/ReservationsTypes";

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
    console.log(response.data);

    return response.data;
  } catch (error) {
    throw handleRequestError(error, "No se pudieron obtener las reservas.");
  }
};

export const deleteReservations = async (id: number): Promise<number> => {
  try {
    return axios.delete(`/admin/reservations/${id}`);
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.errors || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al eliminar la reserva.");
  }
};

export const patchReservationEstado = async ({
  id,
  estado,
}: UpdateEstadoReservaPayload): Promise<{ message: string }> => {
  try {
    const res = await axios.patch(`/admin/reservations/estado/${id}`, {
      estado,
    });
    return res.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response) {
      const backendMessage = error.response.data?.message || error.message;
      throw new Error(backendMessage);
    }
    throw new Error("Error desconocido al actualizar el estado de la reserva.");
  }
};
