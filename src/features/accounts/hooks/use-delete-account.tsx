import { useMutation, useQueryClient } from "@tanstack/react-query";
import { financeKeys } from "@services";
import { deleteFinancialAccount } from "../services";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteFinancialAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: financeKeys.financial_account.all,
      });
    },
  });

  return mutation;
};
