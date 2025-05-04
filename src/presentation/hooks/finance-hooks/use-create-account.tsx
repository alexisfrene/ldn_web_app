import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFinancialAccount, financeKeys } from '@services';

export const useCreateAccount = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createFinancialAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: financeKeys.financial_account.all,
      });
    },
  });

  return mutation;
};
