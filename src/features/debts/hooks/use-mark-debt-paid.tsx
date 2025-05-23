import { useMutation, useQueryClient } from "@tanstack/react-query";
import { financeKeys } from "src/services";
import { markPaidDebt } from "../services";

export const useMarkDebtPaid = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: markPaidDebt,
    onSuccess: ({ debt_id }) => {
      queryClient.invalidateQueries({
        queryKey: financeKeys.debt.detail(debt_id),
      });
      queryClient.invalidateQueries({
        queryKey: financeKeys.debt.all,
      });
    },
  });
  return mutation;
};
