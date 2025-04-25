import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createMovement } from '@services';

export const useCreateMovement = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['movements'],
      });
      queryClient.invalidateQueries({
        queryKey: ['finances'],
      });
      queryClient.invalidateQueries({
        queryKey: ['financial_account'],
      });
    },
  });
  return mutation;
};
