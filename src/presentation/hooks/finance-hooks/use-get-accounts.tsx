import { getAllFinancialAccount } from '@services';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { FinancialAccount } from 'src/types/finance';

export const useGetAccounts = (
  options?: UseQueryOptions<FinancialAccount[], Error>,
) => {
  const query = useQuery({
    queryKey: ['financial_accounts'],
    queryFn: getAllFinancialAccount,
    ...options,
  });

  return {
    accounts: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
