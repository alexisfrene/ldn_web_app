import { useMutation, useQueryClient } from "@tanstack/react-query";
import { financeKeys } from "@services";
import { createFinancialAccount } from "../services";

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
