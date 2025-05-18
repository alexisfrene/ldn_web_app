import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryKeys } from "src/services";
import { addValueCategory } from "../services";

export const useAddCategoryValue = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addValueCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
  return mutation;
};
