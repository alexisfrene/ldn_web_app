import { useMutation, useQueryClient } from "@tanstack/react-query";
import { variationKeys } from "src/services";
import { addNewCollection } from "../services";

export const useCreateVariationCollection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addNewCollection,
    onSuccess: (_, { variation_id }) => {
      queryClient.invalidateQueries({ queryKey: variationKeys.all });
      queryClient.invalidateQueries({
        queryKey: variationKeys.detail(variation_id),
      });
    },
  });

  return mutation;
};
