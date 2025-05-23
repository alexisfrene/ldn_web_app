import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { financeKeys } from "src/services";
import { getDebts } from "../services";

export const useGetDebts = (page?: number, limit?: number) => {
  const query = useQuery({
    queryKey: financeKeys.debt.pages(page, limit),
    placeholderData: keepPreviousData,
    queryFn: () => getDebts({ page, limit }),
  });

  return {
    debts: query.data?.debts || [],
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
