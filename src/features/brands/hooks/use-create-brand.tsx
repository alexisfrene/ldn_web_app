import { useMutation, useQueryClient } from "@tanstack/react-query";
import { brandKeys } from "src/services";
import { createBrand } from "../services";

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: brandKeys.all,
      });
    },
  });

  return mutation;
};
