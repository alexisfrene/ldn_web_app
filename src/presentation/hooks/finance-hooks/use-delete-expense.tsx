import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteExpense } from '@services';

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });
  return mutation;
};
