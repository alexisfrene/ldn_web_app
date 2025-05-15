import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { sizeKeys } from "@services";
import { getAllSizes } from "../services";

export const useGetSizes = (options?: UseQueryOptions<Size[], Error>) => {
  const query = useQuery({
    queryKey: sizeKeys.all,
    queryFn: getAllSizes,
    ...options,
  });

  return {
    sizes: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
