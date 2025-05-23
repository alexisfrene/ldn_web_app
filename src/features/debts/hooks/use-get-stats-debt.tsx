import { useQuery } from "@tanstack/react-query";
import { financeKeys } from "src/services";
import { getStatsDebts } from "../services";

export const useGetStatsDebts = () => {
  const query = useQuery({
    queryKey: financeKeys.debt.all,
    queryFn: getStatsDebts,
  });

  return {
    total: query.data?.debtsTotal || 0,
    totalUnpaid: query.data?.debtsTotalUnpaid || 0,
    totalPaid: query.data?.debtsTotalPaid || 0,
    isLoading: query.isLoading,
    isError: query.isError,
    isPlaceholderData: query.isPlaceholderData,
    isFetching: query.isFetching,
  };
};
