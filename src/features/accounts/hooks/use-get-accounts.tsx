import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { financeKeys } from "src/services";
import { getAllFinancialAccount } from "../services";

export const useGetAccounts = (page?: number, limit?: number) => {
  const query = useQuery({
    queryKey: financeKeys.financial_account.pages(page, limit),
    placeholderData: keepPreviousData,
    queryFn: () => getAllFinancialAccount({ page, limit }),
  });

  return {
    accounts: query.data?.accounts || [],
    totalPages: query.data?.totalPages || 0,
    currentPage: query.data?.currentPage || 0,
    totalItems: query.data?.totalItems || 0,
    limit: query.data?.limit || 0,
    isLoading: query.isLoading,
    isError: query.isError,
    isPlaceholderData: query.isPlaceholderData,
    isFetching: query.isFetching,
  };
};
