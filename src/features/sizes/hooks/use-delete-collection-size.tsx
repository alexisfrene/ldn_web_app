import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sizeKeys } from "@services";
import { deleteCollectionSize } from "../services";

export const useDeleteCollectionSize = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCollectionSize,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sizeKeys.all });
    },
  });

  return mutation;
};
