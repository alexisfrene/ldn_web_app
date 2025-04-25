import { addCategoryConfig } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateCategoryCollection = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addCategoryConfig,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
  return mutation;
};
