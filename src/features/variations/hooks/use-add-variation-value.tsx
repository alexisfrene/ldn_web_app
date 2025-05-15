import { useMutation, useQueryClient } from "@tanstack/react-query";
import { variationKeys } from "@services";
import { addImageCollection } from "../services";

export const useAddVariationCollectionValue = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addImageCollection,
    onSuccess: (_, { variation_id }) => {
      queryClient.invalidateQueries({ queryKey: variationKeys.all });
      queryClient.invalidateQueries({
        queryKey: variationKeys.detail(variation_id),
      });
    },
  });

  return mutation;
};
