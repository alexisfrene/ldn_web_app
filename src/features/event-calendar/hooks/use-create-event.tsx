import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../services";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });

  return mutation;
};
