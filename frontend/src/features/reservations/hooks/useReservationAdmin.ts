import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteReservations, getAllReservationsRequest, patchReservationEstado } from "../api/adminReservationsRequest";

export const useAdminReservations = () => {
  const queryClient = useQueryClient();

  const handleSuccess = (message: string) => toast.success(message);
  const handleError = (context: string, error: any) => {
    console.error(`❌ Error en ${context}:`, error);
    const message =
      error?.response?.data?.message || error?.message || "Error desconocido";
    toast.error(`${context}: ${message}`);
  };

  const {
    data: reservationsAdmin,
    isPending: isFetchingReservationsAdmin,
    error: fetchErrorAdmin,
    refetch,
  } = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => {
      try {
        return await getAllReservationsRequest();
      } catch (error) {
        handleError("Error al obtener reservas", error);
        throw error;
      }
    },
  });

  const {
    mutate: deleteReserva,
    isPending: isDeletingReserva,
    error: deleteError,
  } = useMutation({
    mutationFn: deleteReservations,
    onSuccess: () => {
      handleSuccess("Reserva eliminada correctamente.");
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
    onError: (error) => handleError("Error al eliminar la reserva", error),
  });

  const {
    mutate: updateEstadoReserva,
    isPending: isUpdatingEstadoReserva,
    error: updateError,
  } = useMutation({
    mutationFn: patchReservationEstado,
    onSuccess: () => {
      handleSuccess("Estado actualizado correctamente.");
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
    onError: (error) =>
      handleError("Error al actualizar estado de la reserva", error),
  });

  return {
    getData: {
      reservationsAdmin,
      isFetchingReservationsAdmin,
      fetchErrorAdmin,
    },
    deleteData: {
      deleteReserva,
      isDeletingReserva,
      deleteError,
    },
    updateData: {
      updateEstadoReserva,
      isUpdatingEstadoReserva,
      updateError,
    },
    refetch,
  };
};
