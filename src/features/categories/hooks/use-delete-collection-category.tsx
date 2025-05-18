import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryKeys } from "src/services";
import { deleteCollectionCategory } from "../services";

export const useDeleteCollectionCategory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCollectionCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });

  return mutation;
};
