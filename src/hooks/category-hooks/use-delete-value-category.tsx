import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryKeys, deleteValueCategory } from "@services";

export const useDeleteValueCategory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteValueCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });

  return mutation;
};
