import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys, removeProduct } from "@services";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });

  return mutation;
};
