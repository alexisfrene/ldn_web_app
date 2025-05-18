import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Movement } from "src/types/finance";
import { financeKeys } from "src/services";
import { getAllMovements } from "../services";

interface MovementsResponse {
  movements: Movement[];
  totalPages: number;
  currentPage: number;
  totalItems: number;
  limit: number;
}

export const useGetMovements = (page?: number, limit?: number) => {
  const query = useQuery<MovementsResponse, Error>({
    queryKey: financeKeys.movement.pages(page, limit),
    placeholderData: keepPreviousData,
    queryFn: () => getAllMovements({ page, limit }),
  });

  return {
    movements: query.data?.movements || [],
    totalPages: query.data?.totalPages || 0,
    currentPage: query.data?.currentPage || 0,
    totalItems: query.data?.totalItems || 0,
    limit: query.data?.limit || 0,
    isLoading: query.isLoading,
    isError: query.isError,
    isPlaceholderData: query.isPlaceholderData,
  };
};
