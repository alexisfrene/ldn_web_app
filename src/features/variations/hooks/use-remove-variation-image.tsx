import { useMutation, useQueryClient } from "@tanstack/react-query";
import { variationKeys } from "@services";
import { removeImageCollection } from "../services";

export const useDeleteVariationImage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeImageCollection,
    onSuccess: (_, { variation_id }) => {
      queryClient.invalidateQueries({ queryKey: variationKeys.all });
      queryClient.invalidateQueries({
        queryKey: variationKeys.detail(variation_id),
      });
    },
  });

  return mutation;
};
