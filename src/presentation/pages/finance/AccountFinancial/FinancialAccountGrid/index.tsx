import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@components';
import { getAllFinancialAccount } from '@services';
import { useLoading } from '@hooks';
import { FinancialAccountCard } from '@cards';

export const FinancialAccountGrid: React.FC = () => {
  const { doneLoading, startLoading } = useLoading();
  const financialAccount = useQuery({
    queryKey: ['financial_accounts'],
    queryFn: getAllFinancialAccount,
  });

  const skeletonItems = Array(9).fill(null);
  if (financialAccount.isPending) {
    startLoading();
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
  if (financialAccount.isSuccess) {
    doneLoading();
  }
  if (financialAccount.error) return 'An error has occurred: ';

  return (
    <div className="gap-3 md:grid md:grid-cols-3">
      {financialAccount.data.length ? (
        financialAccount.data.map(
          ({
            name,
            paymentMethods,
            financial_accounts_id,
            total,
          }: {
            name: string;
            type: string;
            financial_accounts_id: UUID;
            total: number;
            paymentMethods: { name: string; payment_method_id: number }[];
          }) => (
            <FinancialAccountCard
              name={name}
              financial_accounts_id={financial_accounts_id}
              total={total}
              key={financial_accounts_id}
              paymentMethods={paymentMethods}
            />
          ),
        )
      ) : (
        <div>No hay cuenta financieras cargadas ...</div>
      )}
    </div>
  );
};
