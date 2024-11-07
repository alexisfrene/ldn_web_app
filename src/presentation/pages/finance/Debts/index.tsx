import React from 'react';
import { Skeleton } from '@components';
import { useQuery } from '@tanstack/react-query';
import { getDebts } from '@services';
import { FormCreateDebt } from './FormCreateDebt';
import { CardDebt } from './CardDebt';

const Debts: React.FC = () => {
  const debts = useQuery({
    queryKey: ['debts'],
    queryFn: getDebts,
  });

  if (debts.isPending) {
    return <Skeleton className="h-[65vh] w-[85vw]" />;
  }
  if (debts.error) return 'An error has occurred: ';

  return (
    <div>
      <FormCreateDebt />
      {debts?.data.map(
        (debt: {
          name: string;
          notes: string;
          debt_id: UUID;
          installments: [];
        }) => (
          <CardDebt
            debt_id={debt.debt_id}
            installments={debt.installments}
            name={debt.name}
            notes={debt.notes}
          />
        ),
      )}
    </div>
  );
};
export default Debts;
