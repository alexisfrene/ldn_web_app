import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFinancialAccount } from '@services';

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createFinancialAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['financial_accounts'],
      });
    },
  });

  return mutation;
};
