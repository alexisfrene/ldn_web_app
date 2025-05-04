import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMovement, financeKeys } from '@services';

export const useDeleteMovement = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: financeKeys.movement.all });
      queryClient.invalidateQueries({ queryKey: financeKeys.expense.all });
    },
  });
  return mutation;
};
