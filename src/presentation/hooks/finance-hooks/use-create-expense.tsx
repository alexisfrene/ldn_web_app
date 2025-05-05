import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpense, financeKeys } from '@services';

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: financeKeys.expense.all,
      });
    },
  });
  return mutation;
};
