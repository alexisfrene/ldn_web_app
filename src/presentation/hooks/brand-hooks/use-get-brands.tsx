import { brandKeys, getAllBrands } from '@services';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Brand } from 'src/types/finance';

export const useGetBrands = (options?: UseQueryOptions<Brand[], Error>) => {
  const query = useQuery({
    queryKey: brandKeys.all,
    queryFn: getAllBrands,
    ...options,
  });

  return {
    brands: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
