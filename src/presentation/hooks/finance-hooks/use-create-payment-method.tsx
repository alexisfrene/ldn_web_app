import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPaymentMethod, financeKeys } from '@services';

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
