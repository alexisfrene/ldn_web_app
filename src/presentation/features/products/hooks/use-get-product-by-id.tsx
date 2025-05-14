import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { productKeys } from "@services";
import { getByIdProduct } from "../services";

export const useGetProductById = (
  productId: string,
  options?: UseQueryOptions<Product, Error>,
) => {
  const query = useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => getByIdProduct(productId),
    ...options,
  });

  return {
    product: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
