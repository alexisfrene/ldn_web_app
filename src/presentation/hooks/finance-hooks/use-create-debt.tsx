import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDebt } from '@services';

export const useCreateDebt = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['debts'],
      });
    },
  });

  return mutation;
};
