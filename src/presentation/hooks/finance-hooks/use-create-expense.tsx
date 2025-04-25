import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createExpense } from '@services';

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });
  return mutation;
};
