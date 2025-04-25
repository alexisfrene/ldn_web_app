import { useMutation, useQueryClient } from '@tanstack/react-query';
import { markPaidDebt } from '@services';

export const useMarkDebtPaid = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: markPaidDebt,
    onSuccess: ({ debt_id }) => {
      queryClient.invalidateQueries({
        queryKey: ['debts', debt_id],
      });
      queryClient.invalidateQueries({
        queryKey: ['debts'],
      });
    },
  });
  return mutation;
};
