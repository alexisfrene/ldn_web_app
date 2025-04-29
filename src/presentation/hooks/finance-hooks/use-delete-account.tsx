import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteFinancialAccount } from '@services';

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteFinancialAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['financial_accounts'],
      });
    },
  });

  return mutation;
};
