import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { usersKeys } from "src/services";
import { getPreferenceProductView } from "../services";

export const useGetPreferences = (options?: UseQueryOptions<any, Error>) => {
  const query = useQuery({
    queryKey: usersKeys.preference,
    queryFn: getPreferenceProductView,
    ...options,
  });

  return {
    preferences: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
