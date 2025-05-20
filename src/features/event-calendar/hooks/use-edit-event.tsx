import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editEvent } from "../services";

export const useEditEvent = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
      });
    },
  });

  return mutation;
};
