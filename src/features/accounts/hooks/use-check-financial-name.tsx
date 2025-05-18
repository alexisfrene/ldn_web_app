import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { checkFinancialAccountName } from "../services";

export const useCheckAccountName = (
  name: string,
  options?: UseQueryOptions<boolean, Error>,
) => {
  const query = useQuery({
    queryKey: ["check_account_name", name],
    queryFn: async () => await checkFinancialAccountName({ name }),
    enabled: Boolean(name),
    ...options,
  });

  return {
    check_name: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  };
};
