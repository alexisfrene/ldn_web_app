import { deleteDebt } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteDebt = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['debts'],
      });
    },
  });
  return mutation;
};
