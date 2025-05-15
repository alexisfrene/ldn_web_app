import { useMutation, useQueryClient } from "@tanstack/react-query";
import { financeKeys } from "@services";
import { createPaymentMethod } from "../services";

export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: financeKeys.payment_method.all,
      });
    },
  });

  return mutation;
};
