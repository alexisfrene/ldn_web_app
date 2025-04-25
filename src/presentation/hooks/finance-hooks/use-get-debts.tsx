import { getDebts } from '@services';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { DebtResponse } from 'src/types/finance';

export const useGetDebts = (options?: UseQueryOptions<DebtResponse, Error>) => {
  const query = useQuery({
    queryKey: ['debts'],
    queryFn: getDebts,
    ...options,
  });

  return {
    debts: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
