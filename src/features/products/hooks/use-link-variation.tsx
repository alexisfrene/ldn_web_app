import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys } from "src/services";
import { linkVariation } from "../services";

export const useLinkVariation = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: linkVariation,
    onSuccess: (_, { product_id }) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(product_id),
      });
    },
  });

  return mutation;
};
