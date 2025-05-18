import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys } from "src/services";
import { createProducts } from "../services";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });

  return mutation;
};
