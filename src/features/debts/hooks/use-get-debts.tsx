import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { DebtResponse } from "src/types/finance";
import { financeKeys } from "src/services";
import { getDebts } from "../services";

export const useGetDebts = (options?: UseQueryOptions<DebtResponse, Error>) => {
  const query = useQuery({
    queryKey: financeKeys.debt.all,
    queryFn: getDebts,
    ...options,
  });

  return {
    debts: query.data?.debts || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
