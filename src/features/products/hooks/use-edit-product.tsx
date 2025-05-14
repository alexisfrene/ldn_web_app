import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys } from "@services";
import { updateProductData } from "../services";

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateProductData,
    onSuccess: (_, { product_id }) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(product_id),
      });
    },
  });

  return mutation;
};
