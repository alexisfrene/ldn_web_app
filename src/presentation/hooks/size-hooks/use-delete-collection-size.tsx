import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCollectionSize, sizeKeys } from '@services';

export const useDeleteCollectionSize = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCollectionSize,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sizeKeys.all });
    },
  });

  return mutation;
};
