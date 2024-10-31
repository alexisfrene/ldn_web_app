import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { LoadingIndicator } from '@components';
import { getAllFinancialAccount } from '@services';
import { FinancialAccountCard } from './FinancialAccountCard';

export const FinancialAccountGrid: React.FC = () => {
  const financialAccount = useQuery({
    queryKey: ['financial_accounts'],
    queryFn: getAllFinancialAccount,
  });

  if (financialAccount.isPending) {
    return <LoadingIndicator isLoading />;
  }
  if (financialAccount.error) return 'An error has occurred: ';

  return (
    <div className="flex flex-wrap gap-1">
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
