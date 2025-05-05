import { addValueCategory, categoryKeys } from '@services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddCategoryValue = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addValueCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoryKeys.all });
    },
  });
  return mutation;
};
