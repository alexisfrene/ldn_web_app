import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@components';
import { getAllFinancialAccount } from '@services';
import { FinancialAccountCard } from './FinancialAccountCard';
import { useLoading } from '@hooks';

export const FinancialAccountGrid: React.FC = () => {
  const { doneLoading, startLoading } = useLoading();
  const financialAccount = useQuery({
    queryKey: ['financial_accounts'],
    queryFn: getAllFinancialAccount,
  });

  if (financialAccount.isPending) {
    startLoading();
    return <Skeleton className="h-[65vh] w-[85vw]" />;
  }
  if (financialAccount.isSuccess) {
    doneLoading();
  }
  if (financialAccount.error) return 'An error has occurred: ';

  return (
    <div className="grid grid-cols-3 gap-3">
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
            financial_accounts_id: string;
            total: number;
            paymentMethods: { name: string; payment_method_id: string }[];
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
