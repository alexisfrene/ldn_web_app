import { useMutation, useQueryClient } from "@tanstack/react-query";
import { modifyTitleCollectionSize, sizeKeys } from "@services";

export const useChangeTitleCollectionSize = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: modifyTitleCollectionSize,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sizeKeys.all });
    },
  });

  return mutation;
};
