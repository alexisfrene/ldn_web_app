import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sizeKeys } from "@services";
import { deleteValueSize } from "../services";

export const useChangeDeleteValueSize = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteValueSize,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sizeKeys.all });
    },
  });

  return mutation;
};
