import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getAllVariations, variationKeys } from "@services";

export const useGetVariations = (
  options?: UseQueryOptions<Variation[], Error>,
) => {
  const query = useQuery({
    queryKey: variationKeys.all,
    queryFn: getAllVariations,
    ...options,
  });

  return {
    variations: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
