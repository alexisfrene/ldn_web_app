import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { financeKeys } from "src/services";
import { getExpenses } from "../services";

export const useGetExpenses = (page?: number, limit?: number) => {
  const query = useQuery({
    queryKey: financeKeys.expense.pages(page ?? 1, limit ?? 10),
    placeholderData: keepPreviousData,
    queryFn: () => getExpenses({ page, limit }),
  });

  return {
    expenses: query.data?.expenses || [],
    totalPages: query.data?.totalPages || 0,
    currentPage: query.data?.currentPage || 0,
    totalItems: query.data?.totalItems || 0,
    limit: query.data?.limit || 0,
    isLoading: query.isLoading,
    isError: query.isError,
    isPlaceholderData: query.isPlaceholderData,
  };
};
