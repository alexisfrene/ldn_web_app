import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys } from "src/services";
import { updateProductDetails } from "../services";

export const useEditProductStyles = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateProductDetails,
    onSuccess: (_, { product_id }) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(product_id),
      });
    },
  });

  return mutation;
};
