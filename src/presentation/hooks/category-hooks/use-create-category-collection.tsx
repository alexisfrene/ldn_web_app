import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCategoryConfig, categoryKeys } from "@services";

export const useCreateCategoryCollection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addCategoryConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
  return mutation;
};
