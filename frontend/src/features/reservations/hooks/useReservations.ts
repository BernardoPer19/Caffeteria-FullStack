import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getReservasUsuario,
  postReservationsRequest,
} from "../api/reservationsRequest";
import { toast } from "sonner";

export const useReservations = () => {
  const queryClient = useQueryClient();

  const handleSuccess = (message: string) => {
    toast.success(message);
  };

  const handleError = (context: string, error: any) => {
    console.error(`❌ Error en ${context}:`, error);
    const message =
      error?.response?.data?.message || error?.message || "Error desconocido";
    toast.error(`${context}: ${message}`);
  };

  const {
    data: reservations,
    isPending: isFetchingReservations,
    error: fetchError,
    refetch,
  } = useQuery({
    queryKey: ["reservasUsuario"],
    queryFn: async () => {
      try {
        return await getReservasUsuario();
      } catch (error) {
        handleError("Error al obtener reservas", error);
        throw error;
      }
    },
  });

  const {
    mutate: createReservation,
    isPending: isCreatingReservation,
    error: createError,
  } = useMutation({
    mutationFn: postReservationsRequest,
    onSuccess: () => {
      handleSuccess("Reserva creada con éxito.");
      queryClient.invalidateQueries({ queryKey: ["reservasUsuario"] });
    },
    onError: (error) => {
      handleError("Error al crear la reserva", error);
    },
  });

  return {
    reservations,
    isFetchingReservations,
    fetchError,

    createReservation,
    isCreatingReservation,
    createError,

    refetch,
  };
};
