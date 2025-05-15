import { useMutation, useQueryClient } from "@tanstack/react-query";
import { variationKeys } from "@services";
import { deleteVariationById } from "../services";

export const useDeleteVariation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteVariationById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: variationKeys.all });
    },
  });

  return mutation;
};
