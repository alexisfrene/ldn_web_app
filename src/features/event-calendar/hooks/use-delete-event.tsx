import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "../services";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });

  return mutation;
};
