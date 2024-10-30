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

            financial_accounts_id,
            total,
          }: {
            name: string;
            type: string;
            financial_accounts_id: string;
            total: number;
          }) => (
            <FinancialAccountCard
              name={name}
              financial_accounts_id={financial_accounts_id}
              total={total}
              key={financial_accounts_id}
            />
          ),
        )
      ) : (
        <div>No hay cuenta financieras cargadas ...</div>
      )}
    </div>
  );
};
