import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { categoryKeys, getCategoryByNames } from "@services";

export const useGetCategoryByNames = (
  collection_item_name: string,
  product_id: string,
  options?: UseQueryOptions<{ category_id: string; value_id: string }, Error>,
) => {
  const query = useQuery({
    queryKey: [categoryKeys.detail(collection_item_name + product_id)],
    queryFn: () => getCategoryByNames({ collection_item_name }),
    enabled: Boolean(collection_item_name),
    ...options,
  });

  return {
    category_id: query.data?.category_id,
    category_value_id: query.data?.value_id,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
