import { getAllMovements } from '@services';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Movement } from 'src/types/finance';

export const useGetMovements = (
  options?: UseQueryOptions<Movement[], Error>,
) => {
  const query = useQuery<Movement[], Error>({
    queryKey: ['movements'],
    queryFn: getAllMovements,
    ...options,
  });

  return {
    movements: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
