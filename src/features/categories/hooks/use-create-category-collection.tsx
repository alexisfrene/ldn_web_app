import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryKeys } from "src/services";
import { addCategoryConfig } from "../services";

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
