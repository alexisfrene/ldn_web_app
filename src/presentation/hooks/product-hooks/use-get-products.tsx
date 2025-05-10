import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { getAllProducts, productKeys } from "@services";

export const useGetProducts = (options?: UseQueryOptions<Product[], Error>) => {
  const query = useQuery({
    queryKey: productKeys.all,
    queryFn: getAllProducts,
    ...options,
  });

  return {
    products: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
