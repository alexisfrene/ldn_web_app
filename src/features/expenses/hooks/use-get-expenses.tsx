import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { Expense } from "src/types/finance";
import { financeKeys } from "src/services";
import { getExpenses } from "../services";

export const useGetExpenses = (options?: UseQueryOptions<Expense[], Error>) => {
  const query = useQuery({
    queryKey: financeKeys.expense.all,
    queryFn: getExpenses,
    ...options,
  });

  return {
    expenses: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
