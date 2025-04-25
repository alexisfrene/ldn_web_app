import { getMovementTotalMonth } from '@services';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { MovementPerMonth } from 'src/types/finance';

export const useGetMovementsPerMonth = (
  options?: UseQueryOptions<MovementPerMonth, Error>,
) => {
  const query = useQuery({
    queryKey: ['movements', 'total_month'],
    queryFn: () => getMovementTotalMonth(),
    ...options,
  });
  return {
    movement_per_month: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
