import { useMutation, useQueryClient } from "@tanstack/react-query";
import { categoryKeys } from "src/services";
import { modifyTitleCollectionCategory } from "../services";

export const useChangeTitleCollectionCategory = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: modifyTitleCollectionCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });

  return mutation;
};
