import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys, usersKeys } from "src/services";
import { changePreferenceProductView } from "../services";

export const useChangePreference = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: changePreferenceProductView,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.preference,
      });
      queryClient.invalidateQueries({
        queryKey: productKeys.all,
      });
    },
  });

  return mutation;
};
