import { useQuery } from "@tanstack/react-query";
import { usersKeys } from "src/services";
import { getPreferenceProductView } from "../services";

export const useGetPreferences = () => {
  const query = useQuery({
    queryKey: usersKeys.preference,
    queryFn: getPreferenceProductView,
  });

  return {
    preferences: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
