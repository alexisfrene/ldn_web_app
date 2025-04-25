import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPaymentMethod } from '@services';

export const useCreatePaymentMethod = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPaymentMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['payment_method'],
      });
    },
  });

  return mutation;
};
