import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { productKeys } from "@services";
import { getAllProducts } from "../services";

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
