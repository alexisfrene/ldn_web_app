import { useMutation, useQueryClient } from "@tanstack/react-query";
import { financeKeys } from "@services";
import { editFinancialAccount } from "../services";

export const useEditAccount = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: editFinancialAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: financeKeys.financial_account.all,
      });
    },
  });
  return mutation;
};
