import { useQuery, useMutation } from "@tanstack/react-query";
import {
  deleteRolRequest,
  getRolRequest,
  updatateDataUsersRequest,
} from "../api/managementUser";
import type { Roles, UserType } from "@/types/UserTypes";
import { toast } from "sonner";

export const useUserManagement = (rol: Roles) => {
  const {
    data: usersData,
    error,
    isError,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["usersData", rol],
    queryFn: () => getRolRequest(rol),
    enabled: !!rol,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const updateMutation = useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: number;
      data: Partial<UserType>;
    }) => updatateDataUsersRequest(userId, data),
    onSuccess: () => {
      toast.success("Usuario actualizado correctamente");
      refetch();
    },
    onError: () => {
      toast.error("Error al actualizar el usuario");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: number) => deleteRolRequest(userId),
    onSuccess: () => {
      toast.success("Usuario eliminado correctamente");
      refetch();
    },
    onError: () => {
      toast.error("Error al eliminar el usuario");
    },
  });

  return {
    data: usersData,
    error,
    isLoading,
    isError,
    actions: {
      updateUser: updateMutation.mutate,
      deleteUser: deleteMutation.mutate,
    },
    mutations: {
      update: updateMutation,
      delete: deleteMutation,
    },
    refetch,
  };
};
