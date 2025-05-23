import React from "react";
import { Skeleton } from "@ui/skeleton";
import { AnimatedPagination } from "@common/animated-pagination";
import { FinancialAccountCard } from "@accounts-cards/account-card";
import { useGetAccounts } from "@accounts-hooks/use-get-accounts";

export const FinancialAccountGrid: React.FC = () => {
  const [page, setPage] = React.useState(1);
  const {
    accounts,
    isLoading,
    isFetching,
    totalPages,
    currentPage,
    isPlaceholderData,
  } = useGetAccounts(page, 9);

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
      <div className="col-span-full">
        {!isLoading ? (
          <AnimatedPagination
            currentPage={currentPage}
            totalPages={totalPages}
            setPage={setPage}
            onClickPrevious={() => setPage((old) => Math.max(old - 1, 0))}
            onClickNext={() => {
              if (!isPlaceholderData && currentPage < totalPages) {
                setPage((old) => old + 1);
              }
            }}
          />
        ) : (
          <div className="mt-1 flex w-full items-center justify-center gap-2">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        )}
      </div>
    </div>
  );
};
