import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { sizeKeys } from "src/services";
import { getSizeByNames } from "../services";

export const useGetSizeByNames = (
  collection_item_name: string,
  product_id: string,
  options?: UseQueryOptions<{ size_id: string; value_id: string }, Error>,
) => {
  const query = useQuery({
    queryKey: sizeKeys.detail(collection_item_name + product_id),
    queryFn: () => getSizeByNames({ collection_item_name }),
    enabled: Boolean(collection_item_name),
    ...options,
  });

  return {
    size_id: query.data?.size_id,
    size_value_id: query.data?.value_id,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
