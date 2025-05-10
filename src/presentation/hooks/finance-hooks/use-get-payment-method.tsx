import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { PaymentMethod } from "src/types/finance";
import { financeKeys, getAllPaymentMethodForUser } from "@services";

export const useGetPaymentMethods = (
  options?: UseQueryOptions<PaymentMethod[], Error>,
) => {
  const query = useQuery({
    queryKey: financeKeys.payment_method.all,
    queryFn: getAllPaymentMethodForUser,
    ...options,
  });
  return {
    payment_methods: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
