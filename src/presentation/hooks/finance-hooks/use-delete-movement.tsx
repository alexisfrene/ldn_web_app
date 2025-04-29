import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMovement } from '@services';

export const useDeleteMovement = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['movements'] });
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
  return mutation;
};
