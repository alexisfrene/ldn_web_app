import { useMutation, useQueryClient } from "@tanstack/react-query";
import { financeKeys } from "src/services";
import { createDebt } from "../services";

export const useCreateDebt = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createDebt,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: financeKeys.debt.all,
      });
    },
  });

  return mutation;
};
