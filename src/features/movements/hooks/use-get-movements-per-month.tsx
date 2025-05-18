import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { MovementPerMonth } from "src/types/finance";
import { financeKeys } from "src/services";
import { getMovementTotalMonth } from "../services";

export const useGetMovementsPerMonth = (
  options?: UseQueryOptions<MovementPerMonth, Error>,
) => {
  const query = useQuery({
    queryKey: financeKeys.statistics.all,
    queryFn: () => getMovementTotalMonth(),
    ...options,
  });
  return {
    movement_per_month: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
