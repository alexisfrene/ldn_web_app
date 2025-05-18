import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { FinancialAccount } from "src/types/finance";
import { financeKeys } from "src/services";
import { getAllFinancialAccount } from "../services";

export const useGetAccounts = (
  options?: UseQueryOptions<FinancialAccount[], Error>,
) => {
  const query = useQuery({
    queryKey: financeKeys.financial_account.all,
    queryFn: getAllFinancialAccount,
    ...options,
  });

  return {
    accounts: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
  };
};
