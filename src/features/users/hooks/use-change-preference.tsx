import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usersKeys } from "src/services";
import { changePreferenceProductView } from "../services";

export const useChangePreference = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: changePreferenceProductView,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.preference,
      });
    },
  });

  return mutation;
};
