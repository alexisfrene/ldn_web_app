import { useMutation, useQueryClient } from "@tanstack/react-query";
import { financeKeys } from "src/services";
import { createMovement } from "../services";

export const useCreateMovement = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: financeKeys.movement.all,
      });
      queryClient.invalidateQueries({
        queryKey: financeKeys.expense.all,
      });
      queryClient.invalidateQueries({
        queryKey: financeKeys.debt.all,
      });
    },
  });
  return mutation;
};
