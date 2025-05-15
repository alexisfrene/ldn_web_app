import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { categoryKeys } from "src/services";
import { getAllCategories } from "../services";

export const useGetCategories = (
  options?: UseQueryOptions<CategoryList, Error>,
) => {
  const query = useQuery({
    queryKey: categoryKeys.all,
    queryFn: getAllCategories,
    ...options,
  });

  return {
    categories: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
