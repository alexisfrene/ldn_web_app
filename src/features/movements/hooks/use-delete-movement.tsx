import { useMutation, useQueryClient } from "@tanstack/react-query";
import { financeKeys } from "src/services";
import { deleteMovement } from "../services";

export const useDeleteMovement = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteMovement,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: financeKeys.movement.all });
      queryClient.invalidateQueries({ queryKey: financeKeys.expense.all });
      queryClient.invalidateQueries({ queryKey: financeKeys.statistics.all });
    },
  });
  return mutation;
};
