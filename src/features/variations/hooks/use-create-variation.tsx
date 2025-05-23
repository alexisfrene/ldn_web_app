import { useMutation, useQueryClient } from "@tanstack/react-query";
import { variationKeys } from "src/services";
import { createVariation } from "../services";

export const useCreateVariation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createVariation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: variationKeys.all });
    },
  });

  return mutation;
};
