import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { PaymentMethod } from "src/types/finance";
import { financeKeys } from "src/services";
import { getAllPaymentMethodForAccount } from "../services";

export const useGetPaymentMethodsByAccount = (
  financial_accounts_id: string,
  options?: UseQueryOptions<PaymentMethod[], Error>,
) => {
  const query = useQuery({
    queryKey: [financeKeys.payment_method.by_account(financial_accounts_id)],
    queryFn: () => getAllPaymentMethodForAccount(financial_accounts_id),
    ...options,
  });
  return {
    payment_methods: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
