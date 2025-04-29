import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editFinancialAccount } from '@services';

export const useEditAccount = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editFinancialAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['financial_accounts'],
      });
    },
  });
  return mutation;
};
