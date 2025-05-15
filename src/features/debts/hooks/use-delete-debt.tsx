import { useMutation, useQueryClient } from "@tanstack/react-query";
import { financeKeys } from "@services";
import { deleteDebt } from "../services";

export const useDeleteDebt = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: financeKeys.debt.all,
      });
    },
  });
  return mutation;
};
