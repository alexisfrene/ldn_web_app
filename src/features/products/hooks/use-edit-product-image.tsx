import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys } from "src/services";
import { updatePrimaryImage } from "../services";

export const useEditProductImage = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updatePrimaryImage,
    onSuccess: (_, { product_id }) => {
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(product_id),
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });

  return mutation;
};
