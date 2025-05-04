import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExpense, financeKeys } from '@services';

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: financeKeys.expense.all,
      });
    },
  });
  return mutation;
};
