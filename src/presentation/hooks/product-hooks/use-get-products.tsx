import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { categoryKeys, getAllProducts } from '@services';

export const useGetProducts = (options?: UseQueryOptions<Product[], Error>) => {
  const query = useQuery({
    queryKey: categoryKeys.all,
    queryFn: getAllProducts,
    ...options,
  });

  return {
    products: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
