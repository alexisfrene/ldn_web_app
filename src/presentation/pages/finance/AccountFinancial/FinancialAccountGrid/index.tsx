import React from "react";
import { FinancialAccountCard } from "@cards/finance-cards";
import { useGetAccounts } from "@hooks/finance-hooks";
import { Skeleton } from "@ui/skeleton";

export const FinancialAccountGrid: React.FC = () => {
  const { accounts, isLoading, isFetching } = useGetAccounts();

  const skeletonItems = Array(9).fill(null);
  if (isLoading) {
    return (
      <>
        {skeletonItems.map((_, index) => (
          <React.Fragment key={index}>
            <Skeleton className="col-span-1" />
            <Skeleton className="col-span-1" />
          </React.Fragment>
        ))}
      </>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {accounts.length ? (
        accounts.map(
          ({ name, paymentMethods, financial_accounts_id, total }) => (
            <FinancialAccountCard
              name={name}
              financial_accounts_id={financial_accounts_id as UUID}
              total={total}
              key={financial_accounts_id}
              paymentMethods={paymentMethods}
            />
          ),
        )
      ) : (
        <div>No hay cuenta financieras cargadas ...</div>
      )}
      {isFetching && <Skeleton className="col-span-1 rounded-xl" />}
    </div>
  );
};
