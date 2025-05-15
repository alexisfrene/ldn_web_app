import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { variationKeys } from "@services";
import { getVariationById } from "../services";

export const useGetVariationById = (
  variationId: string,
  options?: UseQueryOptions<Variation, Error>,
) => {
  const query = useQuery({
    queryKey: variationKeys.detail(variationId),
    queryFn: () => getVariationById(variationId),
    ...options,
  });

  return {
    variation: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
