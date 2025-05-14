import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys, updateProductData } from "@services";

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
