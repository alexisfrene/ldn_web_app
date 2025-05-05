import { useMutation, useQueryClient } from '@tanstack/react-query';
import { brandKeys, createBrand } from '@services';

export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createBrand,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: brandKeys.all,
      });
    },
  });

  return mutation;
};
